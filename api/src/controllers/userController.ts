import jwt from 'jsonwebtoken';

import asyncHandler from 'express-async-handler';
import User, { IUser } from '../models/User';
import {
  generateRefreshToken,
  generateAccessToken,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from '../utils/generateToken';
import { encryptPassword } from '../utils/password';
import type { Response } from 'express';
import { Types } from 'mongoose';

const generateTokensAndResponse = (
  res: Response,
  user: IUser & { _id: string | Types.ObjectId },
) => {
  generateAccessToken(res, user._id);
  generateRefreshToken(res, user._id);
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
};

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).session(null);
    const doesPasswordsMatch = user && (await user.matchPassword(password));

    if (!doesPasswordsMatch) {
      res.status(401);
      throw new Error('Invalid email or password');
    }
    generateTokensAndResponse(res, user);
  } catch (error) {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  console.log('Incoming request body:', req.body);

  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  // const encryptedPassword = await encryptPassword(password);

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      generateTokensAndResponse(res, user);
    }
  } catch (error) {
    res.status(400);
    throw new Error('Invalid user data::: ' + error);
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res: Response) => {
  [ACCESS_TOKEN, REFRESH_TOKEN].forEach((token) => {
    res.cookie(token, '', {
      httpOnly: true,
      expires: new Date(0),
    });
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById((req as any).user._id);

    if (user) {
      res.json({
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

const getInitialData = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById((req as any).user._id);
    if (user) {
      res.json({
        data: {
          name: user.name,
          sub: {
            level: user.subscription_details.subscription_level,
            expiry: user.subscription_details.subscription_expiry,
          },
        },
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById((req as any).user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    res.status(401);
    throw new Error('No refresh token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET) as any;
    const user = await User.findById(decoded.userId);

    if (!user) throw new Error('User not found');
    generateAccessToken(res, user._id);
    res.json({ success: true });
  } catch {
    res.status(401);
    throw new Error('Invalid refresh token');
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  refresh,
  getInitialData,
};
