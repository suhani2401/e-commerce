// config/index.ts
import dotenv from "dotenv";
dotenv.config({quiet: true});

const {
  PORT = 8000,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PORT,
  DB_PASSWORD,
  STRIPE_SECRET_KEY,
  FRONTEND_URL,
  JWT_SECRET_KEY,
  WEBHOOK_ENDPOINT_SECRET_KEY
} = process.env;

export {
  PORT,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PORT,
  DB_PASSWORD,
  STRIPE_SECRET_KEY,
  FRONTEND_URL,
  JWT_SECRET_KEY,
  WEBHOOK_ENDPOINT_SECRET_KEY
};