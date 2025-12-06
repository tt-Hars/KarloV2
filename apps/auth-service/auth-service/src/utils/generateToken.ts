import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { Types } from 'mongoose';

type StringValue = `${number}${"s" | "m" | "h" | "d"}`;

export const REFRESH_TOKEN = 'refreshToken';
export const ACCESS_TOKEN = 'accessToken';

const generateToken = (
  name: string,
  res: Response,
  userId: string | Types.ObjectId,
  expiryTime: number | StringValue,
  maxAge: number,
  JWT_SECRET_KEY: string
) => {
  const token = jwt.sign({ userId }, JWT_SECRET_KEY, {
    expiresIn: expiryTime,
  });

  res.cookie(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: maxAge * 1000, // Convert to milliseconds
  });
};

const generateRefreshToken = (res: Response, userId: string | Types.ObjectId) =>
  generateToken(REFRESH_TOKEN, res, userId, '30d', 30 * 24 * 60 * 60, process.env.JWT_REFRESH_SECRET); // 30 days in seconds
const generateAccessToken = (res: Response, userId: string | Types.ObjectId) =>
  generateToken(ACCESS_TOKEN, res, userId, '15m', 15 * 60, process.env.JWT_ACCESS_SECRET); // 15 minutes in seconds
export { generateAccessToken, generateRefreshToken };
