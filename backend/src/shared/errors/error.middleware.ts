import { NextFunction, Request, Response } from "express";
import { AppError } from "./app-error";
import { HttpStatus } from "../constants/http-status";
import { ErrorMessages } from "../constants/error-messages";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      "success": false,
      "message": err.message,
    });
    return;
  }
  console.error(err);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    "success": false,
    "message": ErrorMessages.INTERNAL_SERVER_ERROR,
  });
};

