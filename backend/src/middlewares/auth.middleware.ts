import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { errorResponse } from "../utils";

declare global{
  namespace Express{
    interface Request{
      user?: JwtPayload;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) return errorResponse(res, "Unauthorized User", 401);

  const user = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
  if(!user) return errorResponse(res, "Unauthorized User", 401);

  req.user = user.data;
  next();
}