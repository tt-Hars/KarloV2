import { DataAPIClient } from '@datastax/astra-db-ts';

let db: any;

export const connectDB = () => {
  if (db) return db;

  try {
    const token = process.env.ASTRA_DB_APPLICATION_TOKEN || process.env.ASTRA_TOKEN;
    const endpoint = process.env.ASTRA_DB_API_ENDPOINT || process.env.ASTRA_ENDPOINT;
    const keyspace = process.env.KEYSPACE || 'default_keyspace';

    if (!token || !endpoint) {
        console.warn('WARNING: Missing Astra DB credentials. Database operations will fail.');
        throw new Error('Missing Astra DB configuration');
    }

    const client = new DataAPIClient(token);
    db = client.db(endpoint, {
      keyspace: keyspace,
    });

    console.log(`[LoggingService] Connected to Astra DB: ${keyspace}`);
    return db;
  } catch (error) {
    console.error('[LoggingService] Failed to connect to Astra DB:', error);
    return null;
  }
};

export const initializeDatabase = async () => {
  const database = connectDB();
  if (!database) {
    console.warn('[LoggingService] DB not connected, skipping initialization');
    return;
  }

  try {
    const collections = await database.listCollections();
    const collectionExists = collections.some((col: any) => col.name === 'service_logs');

    if (!collectionExists) {
      console.log('[LoggingService] Creating "service_logs" collection...');
      await database.createCollection('service_logs');
      console.log('[LoggingService] "service_logs" collection created.');
    } else {
      console.log('[LoggingService] "service_logs" collection already exists.');
    }
  } catch (error) {
    console.error('[LoggingService] Failed to initialize database:', error);
  }
};

export const getLogsCollection = () => {
    const database = connectDB();
    if (!database) {
      console.warn('[LoggingService] DB not connected, cannot get logs collection');
      return null;
    }
    return database.collection('service_logs');
}
