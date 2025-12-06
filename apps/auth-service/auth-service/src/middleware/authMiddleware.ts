import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User';
import { NextFunction, Request, Response } from 'express';
import { log } from 'console';
import { generateAccessToken, REFRESH_TOKEN } from '../utils/generateToken';

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string;

    token = req.cookies[REFRESH_TOKEN];
    log('Token from cookies:', token);
    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_REFRESH_SECRET,
        ) as any;
        console.log('Decoded token:', decoded);
        // @ts-expect-error todo: extend custom Request interface from express which contains user property
        req.user = await User.findById(decoded.userId);
        // console.log(query); // shows if any sort is being added

        next();
      } catch (error) {
        console.error(error);
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
