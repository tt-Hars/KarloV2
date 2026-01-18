import express from 'express';
import * as path from 'path';
import * as fs from 'fs';

const app = express();
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to logging-service!' });
});

app.post('/logs', (req, res) => {
  const logEntry = req.body;
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const logDir = 'logs';
  const logFile = path.join(logDir, `${date}.log`);

  // Ensure logs directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  // Format log line
  const logLine = `${JSON.stringify(logEntry)}\n`;

  // Append to file
  fs.appendFile(logFile, logLine, (err) => {
    if (err) {
      console.error('Failed to write log:', err);
      res.status(500).send({ error: 'Failed to write log' });
    } else {
      res.status(200).send({ message: 'Log received' });
    }
  });
});

const port = process.env.PORT || 3337;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
