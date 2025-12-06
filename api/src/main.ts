import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectToAstraDb from './config/db'
import { notFound, errorHandler } from './middleware/errorMiddleware';
import ROUTE_CONSTANTS, { BASE_PATH } from './constants/routes';
import userRoutes from './routes/userRoutes';
import { REGISTER_V1 } from '@karlo/modules-shared-constants';

dotenv.config()
import {
  create_checkout_session,
  products_route,
  update_user_data,
} from './addon/payment';
import { authUser, registerUser } from './controllers/userController';

let isDbConnected = false;

const app = express();
const router = express.Router();

app.use(async (req, res, next) => {
  if (!isDbConnected) {
    await connectToAstraDb();
    isDbConnected = true;
  }
  next();
});
// app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get(BASE_PATH, (req, res) => {
  console.log(process.env.KEYSPACE);
  res.status(200);
  res.send({ message: 'Welcome to karlo' });
});

app.post(REGISTER_V1, registerUser);
app.post(ROUTE_CONSTANTS.LOGIN, authUser);
app.post(ROUTE_CONSTANTS.INITIATE_PAYMENT, cors(), create_checkout_session);
app.get(ROUTE_CONSTANTS.GET_PRODUCTS, products_route);
app.post(ROUTE_CONSTANTS.UPDATE_USER_DATA, update_user_data);
app.use('/api/v1/users', userRoutes);
const port = process.env.PORT;

app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
  });
  server.on('error', console.error);
}

export const handler = serverless(app, {
  basePath: '/.netlify/functions'
});