import { BASE_V1 } from './base';

export const SUBSCRIPTION = 'subscription';
export const PAYMENT = 'payment';
export const CREATE_CHECKOUT_SESSION = 'create_checkout_session'
export const GET_PRODUCTS = 'get_products';

export const PAYMENT_V1 = `${BASE_V1}${PAYMENT}`;
export const CREATE_CHECKOUT_SESSION_V1 = `${BASE_V1}/${CREATE_CHECKOUT_SESSION}`;
export const GET_PRODUCTS_V1 = `${BASE_V1}/${GET_PRODUCTS}`;
