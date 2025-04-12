import { matchPasswords } from "../utils/password";

import { DataAPIClient } from '@datastax/astra-db-ts';
import { UUID, randomUUID } from 'crypto';
import { encryptPassword } from '../utils/password';
import { IUser } from '../models/User';
import { Request, Response } from 'express';

// should be moved with collection to a class returning a singleton
const {
  ASTRA_DB_APPLICATION_TOKEN,
  ASTRA_DB_API_ENDPOINT,
  USER_COLLECTION,
  KEYSPACE,
} = process.env;
const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT);

export async function login(req: Request, res: Response) { 
    const payload =
    typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  console.log(payload);
  const { email, password } = payload;
  try {
    const collection = await db.collection(USER_COLLECTION);
    const user = await collection.findOne({email})
  } catch (error) {
    console.error(error);
  }
}

