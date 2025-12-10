import { DataAPIClient } from '@datastax/astra-db-ts';

let db: any;

export const connectDB = () => {
  if (db) return db;

  const client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN as string);
  db = client.db(process.env.ASTRA_DB_API_ENDPOINT as string, {
    keyspace: process.env.KEYSPACE,
  });

  console.log(`Connected to Astra DB: ${process.env.KEYSPACE}`);
  return db;
};

export const getFollowersCollection = () => {
    const database = connectDB();
    return database.collection('followers_by_user');
}

export const getFollowingCollection = () => {
    const database = connectDB();
    return database.collection('following_by_user');
}
