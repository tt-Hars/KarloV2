import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import cors from 'cors';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import serverless from 'serverless-http';
import dotenv from 'dotenv';

dotenv.config();

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
    await server.start();
    serverStarted = true;
    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({
                userId: req.headers['x-user-id']
            })
        }),
    );
  }
};

// If running locally with `node` or `pm2` (not serverless)
if (require.main === module) {
    (async () => {
        await startServer();
        app.listen(port, '127.0.0.1', () => {
            console.log(`Social Graph Service ready at http://127.0.0.1:${port}/graphql`);
        });
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
