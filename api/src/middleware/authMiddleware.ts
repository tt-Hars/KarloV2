import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User';
import { NextFunction, Request, Response } from 'express';

const protect = asyncHandler(async (req: Request, res:Response, next: NextFunction) => {
  let token: string;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;

      // @ts-expect-error todo: extend custom Request interface from express which contains user property
      req.user = await User.findById(decoded.userId).select('-password');

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
});

export { protect };