import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();

app.use(cors());

// Proxy configuration - Use 127.0.0.1 to match service binding
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://127.0.0.1:3333';
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || 'http://127.0.0.1:3334';

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to Gateway API' });
});

// Auth Routes -> Auth Service
app.use(
  '/api/v1/users',
  createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
  })
);

// Login route is /api/v1/one_login
app.use(
  '/api/v1/one_login',
  createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
  })
);

app.use(
  '/api/v1/register',
  createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
  })
);

app.use(
  '/api/v1/auth',
  createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
  })
);

// Payment Routes -> Payment Service
app.use(
  '/api/v1/create_checkout_session',
  createProxyMiddleware({
    target: PAYMENT_SERVICE_URL,
    changeOrigin: true,
  })
);

app.use(
  '/api/v1/get_products',
  createProxyMiddleware({
    target: PAYMENT_SERVICE_URL,
    changeOrigin: true,
  })
);

app.use(
  '/api/v1/update_user_data',
  createProxyMiddleware({
    target: PAYMENT_SERVICE_URL,
    changeOrigin: true,
  })
);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Gateway listening at http://localhost:${port}/`);
});
server.on('error', console.error);
