import asyncHandler from 'express-async-handler';
import User from '../models/User';
import { Stripe } from 'stripe';
import process from 'process';
import { Request, Response } from 'express';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const DOMAIN = 'http://localhost:4200';
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

// add a subscription controller here
// @desc    Subscribe user
// @route   POST /api/subscribe
// @access  Private
const subscribeUser = asyncHandler(async (req, res) => {
  const { session_id, id, subscription_level } = req.body;
  const session_detail = await get_session(session_id);
  const subscription_id =
    typeof session_detail.subscription === 'string'
      ? session_detail.subscription
      : session_detail?.subscription?.id;
  const subscription_detail = await get_subscriptions(subscription_id);
  const { current_period_end } = subscription_detail;

  const user = await User.findOne(id);
  if (user) {
    user.subscription_details.subscription_id = subscription_id;
    user.subscription_details.subscription_level = subscription_level;
    user.subscription_details.subscription_expiry = new Date(
      current_period_end,
    );
    user.save();
    res.status(201);
    res.send(user);
  } else {
    res.status(401);
    throw new Error('User not found');
  }
});
