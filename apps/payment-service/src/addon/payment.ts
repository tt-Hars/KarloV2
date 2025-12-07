import { DataAPIClient } from '@datastax/astra-db-ts';
import { Stripe } from 'stripe';
import { Request, Response } from 'express';
import * as process from 'process';

const {
  ASTRA_DB_APPLICATION_TOKEN,
  ASTRA_DB_API_ENDPOINT,
  USER_COLLECTION,
  FRONTEND_URL,
} = process.env;

const client = new DataAPIClient(
  ASTRA_DB_APPLICATION_TOKEN
);

const db = client.db(ASTRA_DB_API_ENDPOINT)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
  // Use FRONTEND_URL if available (e.g. from env), otherwise check for Netlify URL, otherwise fallback to localhost:3000 (gateway)
  const domain = FRONTEND_URL || process.env.URL || 'http://localhost:3000';

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
    success_url: `${domain}/payment?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domain}/payment?canceled=true`,
  });

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

    // Direct DB update without Mongoose User model
    const collection = await db.collection(USER_COLLECTION);
    const result = await collection.updateOne(
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
    );
    res.status(200).send(result);
  } catch (error) {
    console.error('Error while updating user data', error);
    res.status(500).send({ message: 'Error updating subscription' });
  }
};

export const products_route = async (req: Request, res: Response) => {
  const products = await get_products();
  res.status(200).json(products);
};
