import { DataAPIClient } from '@datastax/astra-db-ts';

let db: any;

export const connectDB = () => {
  if (db) return db;

  try {
    if (!process.env.ASTRA_DB_APPLICATION_TOKEN || !process.env.ASTRA_DB_API_ENDPOINT) {
        throw new Error('Missing Astra DB credentials in environment variables.');
    }

    const client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN as string);
    db = client.db(process.env.ASTRA_DB_API_ENDPOINT as string, {
      keyspace: process.env.KEYSPACE,
    });

    console.log(`Connected to Astra DB: ${process.env.KEYSPACE}`);
    return db;
  } catch (error) {
    console.error('Failed to connect to Astra DB:', error);
    throw error;
  }
};

export const getFollowersCollection = () => {
    try {
        const database = connectDB();
        return database.collection('followers_by_user');
    } catch (error) {
        console.error('Error getting followers collection:', error);
        throw error;
    }
}

export const getFollowingCollection = () => {
    try {
        const database = connectDB();
        return database.collection('following_by_user');
    } catch (error) {
        console.error('Error getting following collection:', error);
        throw error;
    }
}
