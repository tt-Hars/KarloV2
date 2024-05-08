import { DataAPIClient } from '@datastax/astra-db-ts';
import { UUID, randomUUID } from 'crypto';
import { encryptPassword } from '../utils/password';
import { User } from '../models/User';
import { Request, Response } from 'express';

// should be moved with collection to a class returning a singleton
const {ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT, USER_COLLECTION, KEYSPACE} = process.env
const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN)
const db = client.db(ASTRA_DB_API_ENDPOINT)

export async function register(req: Request, res: Response) {
  // todo: encrypt payload from UI
  const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  console.log(payload)
  const { email, password, username } = payload
  const user_id: UUID = randomUUID();
  const encryptedPassword = await encryptPassword(password);
  const user: User = {
    user_id,
    username,
    password: encryptedPassword,
    email,
    subscription_level: 'NONE',
    subscription_expiry: null,
    provider: null,
    provider_user_id: null,
    created_at: new Date(),
  };

  const collection = await db.collection(USER_COLLECTION);
  collection.insertOne(user).then((data) => {
    res.status(201);
    res.send(data);
  });
}
