/* eslint-disable */
import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ?? '3337'; // 3337 is the port we set in main.ts
  axios.defaults.baseURL = `http://${host}:${port}`;
};
