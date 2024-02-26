import { AstraDB } from '@datastax/astra-db-ts';
import { UUID, randomUUID } from 'crypto';
import { encryptPassword } from '../utils/password';
import { User } from '../models/User';
import { Request, Response } from 'express';

export async function register(req: Request, res: Response) {
  // todo: encrypt payload from UI
  const { email, password, username } = req.body;
  const user_id: UUID = randomUUID();
  const {ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT, USER_COLLECTION, KEYSPACE} = process.env
  const db = new AstraDB(
    ASTRA_DB_APPLICATION_TOKEN,
    ASTRA_DB_API_ENDPOINT,
    KEYSPACE,
  );
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