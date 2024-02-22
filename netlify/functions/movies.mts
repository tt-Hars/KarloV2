import { Context } from '@netlify/functions';
import { AstraDB } from '@datastax/astra-db-ts';

export default async (req: Request, context: Context) => {
  const ASTRA_DB_APPLICATION_TOKEN = process.env.ASTRA_DB_APPLICATION_TOKEN
  const ASTRA_DB_API_ENDPOINT = process.env.ASTRA_DB_API_ENDPOINT
  const COLLECTION_NAME = process.env.COLLECTION_NAME ?? ''
  const KEYSPACE = process.env.KEYSPACE
  const limit=10

  const db = new AstraDB(
    ASTRA_DB_APPLICATION_TOKEN,
    ASTRA_DB_API_ENDPOINT,
    KEYSPACE,
  );

  const collection = await db.collection(COLLECTION_NAME)
  const record = await collection.find({}, {limit}).toArray()

  console.log(record)
  // @ts-ignore
  return new Response(JSON.stringify(record))
};
