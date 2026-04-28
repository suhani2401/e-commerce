import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { errorResponse } from "../utils";

type ValidateSource = "body" | "query" | "params";

export const validation = (
  schema: ObjectSchema,
  source: ValidateSource = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[source];

    const { error, value } = schema.validate(data, {
      abortEarly: false, // show all errors
      stripUnknown: true, // remove extra fields
    });

    if (error) {
      return errorResponse(res, "Validation failed", 400, {
        code: "VALIDATION_ERROR",
        details: error.details.map((d) => d.message),
      });
    }

    // replace req data with validated/sanitized data
    req[source] = value;

    next();
  };
};