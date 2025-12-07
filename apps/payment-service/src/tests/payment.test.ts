import request from 'supertest';
import express from 'express';
import { products_route } from '../addon/payment';
import bodyParser from 'body-parser';

// Mock Stripe and DB
jest.mock('stripe', () => {
  return {
    Stripe: jest.fn().mockImplementation(() => ({
      products: {
        list: jest.fn().mockResolvedValue({ data: [{ id: 'prod_1', name: 'Premium' }] }),
      },
    })),
  };
});

jest.mock('@datastax/astra-db-ts', () => ({
  DataAPIClient: jest.fn().mockImplementation(() => ({
    db: jest.fn().mockReturnValue({
      collection: jest.fn(),
    }),
  })),
}));

const app = express();
app.use(bodyParser.json());
app.get('/api/v1/get_products', products_route);

describe('Payment Service', () => {
  it('should fetch products list', async () => {
    const res = await request(app).get('/api/v1/get_products');
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.data[0].id).toBe('prod_1');
  });
});
