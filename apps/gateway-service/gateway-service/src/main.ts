import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();

app.use(cors());

// Proxy configuration
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3333';
const LEGACY_API_URL = process.env.LEGACY_API_URL || 'http://localhost:3334'; // Assuming legacy api runs here

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

app.use(
  '/api/v1/auth',
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


// Everything else -> Legacy API
app.use(
  '/',
  createProxyMiddleware({
    target: LEGACY_API_URL,
    changeOrigin: true,
  })
);


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Gateway listening at http://localhost:${port}/`);
});
server.on('error', console.error);
