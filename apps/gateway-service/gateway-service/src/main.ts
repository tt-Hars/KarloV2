import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();

app.use(cors());

// Proxy configuration - Use 127.0.0.1 to match service binding
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://127.0.0.1:3333';
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || 'http://127.0.0.1:3334';
const FEEDS_SERVICE_URL = process.env.FEEDS_SERVICE_URL || 'http://127.0.0.1:3335';

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to Gateway API' });
});

const pathRewrite = (path: string, req: express.Request) => req.originalUrl;

// Auth Routes -> Auth Service
app.use(
  '/api/v1/users',
  createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite,
  })
);

// Login route is /api/v1/one_login
app.use(
  '/api/v1/one_login',
  createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite,
  })
);

app.use(
  '/api/v1/register',
  createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite,
  })
);

app.use(
  '/api/v1/auth',
  createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite,
  })
);

// Payment Routes -> Payment Service
app.use(
  '/api/v1/create_checkout_session',
  createProxyMiddleware({
    target: PAYMENT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite,
  })
);

app.use(
  '/api/v1/get_products',
  createProxyMiddleware({
    target: PAYMENT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite,
  })
);

app.use(
  '/api/v1/update_user_data',
  createProxyMiddleware({
    target: PAYMENT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite,
  })
);

// Feeds Routes -> Feeds Service
app.use(
  '/api/v1/feed',
  createProxyMiddleware({
    target: FEEDS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite,
  })
);

const SOCIAL_GRAPH_SERVICE_URL = process.env.SOCIAL_GRAPH_SERVICE_URL || 'http://127.0.0.1:3336';

// Social Graph Routes -> Social Graph Service
// We proxy /graphql directly.
app.use(
  '/graphql',
  createProxyMiddleware({
    target: SOCIAL_GRAPH_SERVICE_URL,
    changeOrigin: true,
    // Express app.use('/graphql') strips '/graphql' from the req.url before passing to middleware.
    // So req.url becomes '/'. The upstream service expects '/graphql'.
    // We need to rewrite the path to include '/graphql' again.
    pathRewrite: (path, req) => {
       // If the path is just '/' (stripped), we want it to be '/graphql'
       // If the path is '/something', we want '/graphql/something'
       // However, often GraphQL requests are just POST /graphql
       return '/graphql' + path;
    }
  })
);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Gateway listening at http://localhost:${port}/`);
});
server.on('error', console.error);
