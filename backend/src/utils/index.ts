import { Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, STRIPE_SECRET_KEY } from "../config";
import Stripe from "stripe";

export const successResponse = (
  res: Response,
  message: string,
  data: any = null,
  statusCode: number = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = 500,
  error: any = null
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(error && { error }),
  });
};

export const generateJwtToken = <T>(data: T) => {
  return jwt.sign({ data },JWT_SECRET_KEY!, {
    expiresIn: "1hr",
  });
};

export const stripe = new Stripe(STRIPE_SECRET_KEY);
