import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import cors from 'cors';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import serverless from 'serverless-http';
import dotenv from 'dotenv';

dotenv.config();

// Global Error Handlers to debug crashes
process.on('uncaughtException', (error) => {
    console.error('CRITICAL: Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('CRITICAL: Unhandled Rejection at:', promise, 'reason:', reason);
});

const app = express();
const port = process.env.SOCIAL_GRAPH_SERVICE_PORT ? Number(process.env.SOCIAL_GRAPH_SERVICE_PORT) : 3336;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Note: In a serverless environment (Netlify Functions), starting the server
// asynchronously inside the handler is tricky.
// However, `serverless-http` wraps the express app.
// Apollo Server 4 `start()` is async.

let serverStarted = false;
let serverlessHandler: any;

const startServer = async () => {
  if (!serverStarted) {
    console.log('Starting Apollo Server...');
    console.log('Env Check:', {
        ASTRA_TOKEN: !!process.env.ASTRA_DB_APPLICATION_TOKEN,
        ASTRA_ENDPOINT: !!process.env.ASTRA_DB_API_ENDPOINT
    });

    await server.start();
    serverStarted = true;
    console.log('Apollo Server started.');

    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        express.json(),
        (req, res, next) => {
            console.log(`[SocialGraph] Processing ${req.method} ${req.url}`);
            try {
                next();
            } catch (e) {
                console.error('[SocialGraph] Middleware Error:', e);
                res.status(500).json({ error: 'Internal Middleware Error' });
            }
        },
        expressMiddleware(server, {
            context: async ({ req }) => {
                const userId = (req.headers['x-user-id'] as string) || (req.query.userId as string) || '';
                console.log('[SocialGraph] Building context...');
                try {
                    return {
                        userId
                    };
                } catch (e) {
                    console.error('[SocialGraph] Context Error:', e);
                    return {};
                }
            }
        }),
    );

    // Add global error handler for Express
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.error('[SocialGraph] Express Global Error:', err);
        res.status(500).send('Internal Server Error');
    });
  }
};

// If running locally with `node` or `pm2` (not serverless)
if (require.main === module) {
    (async () => {
        await startServer();
        const serverInstance = app.listen(port, '127.0.0.1', () => {
            console.log(`Social Graph Service ready at http://127.0.0.1:${port}/graphql`);
        });
        // Increase keep-alive to avoid race conditions with proxies
        serverInstance.keepAliveTimeout = 120 * 1000;
        serverInstance.headersTimeout = 120 * 1000;
    })();
}

// Export for serverless
export const handler = async (event: any, context: any) => {
    if (!serverlessHandler) {
        await startServer();
        serverlessHandler = serverless(app);
    }
    return serverlessHandler(event, context);
};
