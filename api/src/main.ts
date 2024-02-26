/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  console.log(process.env.KEYSPACE)
  res.status(200)
  res.send({ message: 'Welcome to api!' });
});

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
