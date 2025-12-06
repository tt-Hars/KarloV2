import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import ROUTE_CONSTANTS, { BASE_PATH } from './constants/routes';

dotenv.config()
import {
  create_checkout_session,
  products_route,
  update_user_data,
} from './addon/payment';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get(BASE_PATH, (req, res) => {
  console.log(process.env.KEYSPACE);
  res.status(200);
  res.send({ message: 'Welcome to karlo (Legacy API)' });
});

app.post(ROUTE_CONSTANTS.INITIATE_PAYMENT, cors(), create_checkout_session);
app.get(ROUTE_CONSTANTS.GET_PRODUCTS, products_route);
app.post(ROUTE_CONSTANTS.UPDATE_USER_DATA, update_user_data);

const port = process.env.LEGACY_API_PORT || 3334;

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
