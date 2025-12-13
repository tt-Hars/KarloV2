import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import serverless from 'serverless-http';
import mongoose from 'mongoose';
import connectToAstraDb from './config/db'
import { notFound, errorHandler } from './middleware/errorMiddleware';
import ROUTE_CONSTANTS, { BASE_PATH } from './constants/routes';
import userRoutes from './routes/userRoutes';
import { REGISTER_V1 } from '@karlo/modules-shared-constants';
import { authUser, registerUser } from './controllers/userController';

dotenv.config()

const app = express();

app.use(async (req, res, next) => {
  if ((mongoose.connection.readyState as unknown as number) === 1) {
    return next();
  }

  try {
    await connectToAstraDb();
    if ((mongoose.connection.readyState as unknown as number) === 1) {
      next();
    } else {
      res.status(503).json({ message: 'Service Unavailable: Database connection failed' });
    }
  } catch (error) {
    console.error('Database connection error in middleware:', error);
    res.status(503).json({ message: 'Service Unavailable: Database error' });
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get(BASE_PATH, (req, res) => {
  res.status(200);
  res.send({ message: 'Auth Service Operational' });
});

// Auth Routes
app.post(REGISTER_V1, registerUser);
app.post(ROUTE_CONSTANTS.LOGIN, authUser);
app.use('/api/v1/users', userRoutes);

const port = Number(process.env.AUTH_SERVICE_PORT) || 3333;

app.use(notFound);
app.use(errorHandler);

// Ensure the server listens when run directly (e.g. by Nx/PM2)
// Use require.main === module check which is more reliable than NODE_ENV for this context
if (require.main === module) {
  // Try to connect to DB on startup, but don't block server listen
  connectToAstraDb().catch(err => console.error('Initial DB connection failed:', err));

  const server = app.listen(port, '127.0.0.1', () => {
    console.log(`Auth Service listening at http://127.0.0.1:${port}/`);
  });
  server.on('error', console.error);
}

// Auth service uses /.netlify/functions/auth as base path
export const handler = serverless(app, {
  basePath: '/.netlify/functions/auth'
});
