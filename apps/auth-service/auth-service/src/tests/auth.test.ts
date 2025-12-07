import request from 'supertest';
import express from 'express';
import { authUser, registerUser } from '../controllers/userController';
import bodyParser from 'body-parser';

// Mock Mongoose User model
jest.mock('../models/User', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
}));

// Mock utils
jest.mock('../utils/generateToken', () => ({
  generateAccessToken: jest.fn(),
  generateRefreshToken: jest.fn(),
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
}));

jest.mock('../utils/password', () => ({
  encryptPassword: jest.fn().mockResolvedValue('encryptedPassword'),
}));

const User = require('../models/User');

const app = express();
app.use(bodyParser.json());
app.post('/api/users/auth', authUser);
app.post('/api/users/register', registerUser);

describe('Auth Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/users/auth', () => {
    it('should authenticate user with correct credentials', async () => {
      const mockUser = {
        _id: '123',
        name: 'Test User',
        email: 'test@example.com',
        matchPassword: jest.fn().mockResolvedValue(true),
      };
      User.findOne.mockResolvedValue(mockUser);

      const res = await request(app)
        .post('/api/users/auth')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id', '123');
    });

    it('should return 401 for invalid credentials', async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/users/auth')
        .send({ email: 'wrong@example.com', password: 'password123' });

      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      User.findOne.mockResolvedValue(null); // No existing user
      const mockUser = {
        _id: '123',
        name: 'New User',
        email: 'new@example.com',
      };
      User.create.mockResolvedValue(mockUser);

      const res = await request(app)
        .post('/api/users/register')
        .send({ name: 'New User', email: 'new@example.com', password: 'password123' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id', '123');
    });

    it('should return 400 if user already exists', async () => {
      User.findOne.mockResolvedValue({ email: 'existing@example.com' });

      const res = await request(app)
        .post('/api/users/register')
        .send({ name: 'User', email: 'existing@example.com', password: 'password' });

      expect(res.status).toBe(400);
    });
  });
});
