/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import register from './routes/register';
import cors from 'cors';
import ROUTE_CONSTANTS, { BASE_PATH } from './constants/routes';

import * as path from 'path';
import {
  create_checkout_session,
  products_route,
  update_user_data,
} from './addon/payment';

const app = express();

// app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get(BASE_PATH, (req, res) => {
  console.log(process.env.KEYSPACE);
  res.status(200);
  res.send({ message: 'Welcome to karlo' });
});

app.post(ROUTE_CONSTANTS.REGISTER, register);
app.post(ROUTE_CONSTANTS.INITIATE_PAYMENT, cors(), create_checkout_session);
app.get(ROUTE_CONSTANTS.GET_PRODUCTS, products_route);
app.post(ROUTE_CONSTANTS.UPDATE_USER_DATA, update_user_data);
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
