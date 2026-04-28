import express from "express";
import cors from "cors";
import { FRONTEND_URL } from "./config";
import { routes } from "./routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
routes.forEach((route) => {
  app.use(`/api`, route.router);
});

export default app;