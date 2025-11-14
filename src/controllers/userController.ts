import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";

const signToken = (userId: string) => {
  const secret = process.env.JWT_SECRET as jwt.Secret;

  const expiresIn = (process.env.JWT_EXPIRES_IN ??
    "7d") as jwt.SignOptions["expiresIn"];

  return jwt.sign({ id: userId }, secret, { expiresIn });
};

//handler to sign up the user
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email an password required",
      });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });
    }

    const user = await User.create({ name, email, password });

    const token = signToken(user._id.toString());

    const userSafe = { id: user._id, name: user.name, email: user.email };

    res.status(201).json({
      success: true,
      token,
      user: userSafe,
    });
  } catch (error) {
    next(error);
  }
};

// handler to login the user
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password is required!",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = signToken(user._id.toString());
    const userSafe = { id: user._id, name: user.name, email: user.email };

    res.status(200).json({
      success: true,
      token,
      user: userSafe,
    });
  } catch (error) {
    next(error);
  }
};
