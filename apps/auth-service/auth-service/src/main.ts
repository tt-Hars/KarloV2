import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectToAstraDb from './config/db'
import { notFound, errorHandler } from './middleware/errorMiddleware';
import ROUTE_CONSTANTS, { BASE_PATH } from './constants/routes';
import userRoutes from './routes/userRoutes';
import { REGISTER_V1 } from '@karlo/modules-shared-constants';
import { authUser, registerUser } from './controllers/userController';

dotenv.config()

let isDbConnected = false;

const app = express();

app.use(async (req, res, next) => {
  if (!isDbConnected) {
    await connectToAstraDb();
    isDbConnected = true;
  }
  next();
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

const server = app.listen(port, '127.0.0.1', () => {
  console.log(`Auth Service listening at http://127.0.0.1:${port}/`);
});
server.on('error', console.error);
