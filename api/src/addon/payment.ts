import { DataAPIClient } from '@datastax/astra-db-ts';
import { Stripe } from 'stripe';
import { Request, Response } from 'express';
import * as process from 'process';

const {
  ASTRA_DB_APPLICATION_TOKEN,
  ASTRA_DB_API_ENDPOINT,
  USER_COLLECTION,
  KEYSPACE,
} = process.env;
const client = new DataAPIClient(
  ASTRA_DB_APPLICATION_TOKEN
);

const db = client.db(ASTRA_DB_API_ENDPOINT)



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const DOMAIN = 'http://localhost:4200'
export function get_products() {
  return stripe.products.list({
    limit: 3,
  });
}

export function get_subscriptions(subscription_id: string) {
  return stripe.subscriptions.retrieve(subscription_id);
}

export function get_session(session_id: string) {
  return stripe.checkout.sessions.retrieve(session_id);
}
export const create_checkout_session = async (req: Request, res: Response) => {
  const price_id = req.body.productId;
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    line_items: [
      {
        price: price_id,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${DOMAIN}/payment?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${DOMAIN}/payment?canceled=true`,
  });

  // res.redirect(303, session.url); does not work with react properly CORS error
  res.json(session.url);
};

export const update_user_data = async (req: Request, res: Response) => {
  console.log(req.body);
  const { session_id, _id, subscription_level } = req.body;
  try {
    const session_detail = await get_session(session_id);
  const subscription_id =
    typeof session_detail.subscription === 'string'
      ? session_detail.subscription
      : session_detail?.subscription?.id;
  const subscription_detail = await get_subscriptions(subscription_id);
  const { current_period_end } = subscription_detail;
  const collection = await db.collection(USER_COLLECTION);
  collection
    .updateOne(
      { _id },
      {
        $set: {
          subscription_details: {
            subscription_id,
            subscription_level,
            subscription_expiry: new Date(
              current_period_end * 1000,
            ).toISOString(),
          }
        }
      }      
    )
    .then((data) => {
      res.status(200);
      res.send(data);
    });
  } catch {
    console.error('Error while updating user data');
  }
};

export const products_route = async (req: Request, res: Response) => {
  const products = await get_products();
  res.status(200);
  res.json(products);
};
