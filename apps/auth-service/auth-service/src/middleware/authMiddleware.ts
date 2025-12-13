import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User';
import { NextFunction, Request, Response } from 'express';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/generateToken';

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string;
    let secret = process.env.JWT_ACCESS_SECRET;

    // 1. Check Authorization Header (Bearer token) - Preferred
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }
    // 2. Check Access Token Cookie
    else if (req.cookies[ACCESS_TOKEN]) {
        token = req.cookies[ACCESS_TOKEN];
    }
    // 3. Fallback: Check Refresh Token Cookie (Legacy support)
    else if (req.cookies[REFRESH_TOKEN]) {
        token = req.cookies[REFRESH_TOKEN];
        secret = process.env.JWT_REFRESH_SECRET;
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, secret) as any;

        // Fetch user from DB to attach to request
        // This confirms the user still exists and fetches their latest state/roles
        // @ts-expect-error todo: extend custom Request interface from express which contains user property
        req.user = await User.findById(decoded.userId).select('-password');

        if (!req.user) {
             res.status(401);
             throw new Error('Not authorized, user not found');
        }

        next();
      } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  },
);

export { protect };
