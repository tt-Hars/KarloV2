import express from 'express';
import * as path from 'path';
import dotenv from 'dotenv';
import { getLogsCollection, initializeDatabase } from './db';

dotenv.config();

// Initialize DB on startup
initializeDatabase().catch(err => {
    console.error('[LoggingService] Startup DB initialization failed:', err);
});

const app = express();
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// In-memory buffer for logs
let logBuffer: any[] = [];
const FLUSH_INTERVAL_MS = 10000; // 10 seconds

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to logging-service!' });
});

app.post('/logs', (req, res) => {
  const logEntry = req.body;

  if (logEntry) {
    // Add receive timestamp
    const entryWithTimestamp = {
      ...logEntry,
      receivedAt: new Date().toISOString()
    };
    logBuffer.push(entryWithTimestamp);
  }

  // Respond immediately to not block the caller
  res.status(200).send({ message: 'Log buffered' });
});

app.get('/logs', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit as string) || 50;
        const offset = parseInt(req.query.offset as string) || 0;

        // Dynamic import to avoid circular dependency issues if any
        const { getLogs } = require('./db');
        const logs = await getLogs(limit, offset);

        res.status(200).json(logs);
    } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
});

// Flush logs to DB periodically
const flushLogs = async () => {
  if (logBuffer.length === 0) return;

  const logsToInsert = [...logBuffer];
  logBuffer = []; // Clear buffer immediately

  console.log(`[LoggingService] Flushing ${logsToInsert.length} logs to DB...`);

  try {
    const collection = getLogsCollection();
    if (collection) {
      await collection.insertMany(logsToInsert);
      console.log(`[LoggingService] Successfully flushed ${logsToInsert.length} logs.`);
    } else {
      console.warn('[LoggingService] DB collection unavailable. Logs discarded.');
      // Optionally: put them back in the buffer if you want strict durability,
      // but for dev/logging service usually we drop if DB is down to avoid memory leak.
    }
  } catch (error) {
    console.error('[LoggingService] Failed to flush logs:', error);
    // In case of error, we might want to preserve them, but being careful of memory growth
    if (logBuffer.length < 1000) {
        logBuffer = [...logsToInsert, ...logBuffer];
    }
  }
};

// Start the flush interval
setInterval(flushLogs, FLUSH_INTERVAL_MS);

const port = process.env.PORT || 3337;
const server = app.listen(port, () => {
  console.log(`Logging Service listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
