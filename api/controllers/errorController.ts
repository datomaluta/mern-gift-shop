import { AppError } from "../utils/appError";
import { Request, Response, NextFunction } from "express";

const handleCastErrorDB = (err: { path: string; value: string }) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: {
  errorResponse: { errmsg: string };
}) => {
  const matchResult = err?.errorResponse?.errmsg?.match(/(["'])(\\?.)*?\1/);
  const value = matchResult && matchResult[0].replace(/["']/g, "");

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: {
  errors: { [key: string]: { message: string } };
}) => {
  const errors = Object.values(err.errors).map((el: { message: string }) => {
    return el.message;
  });

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};
const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

const sendErrorDev = (
  err: { statusCode: number; status: string; message: string; stack?: string },
  req: Request,
  res: Response
) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (
  err: {
    isOperational: boolean;
    status: string;
    message: string;
    statusCode: number;
  },
  req: Request,
  res: Response
) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};

export const globalErrorHandler = (
  err: {
    isOperational?: boolean;
    statusCode?: number;
    status?: string;
    message?: string;
    code?: number;
    path?: string;
    value?: string;
  },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(
      err as {
        statusCode: number;
        status: string;
        message: string;
        stack?: string;
      },
      req,
      res
    );
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    error.message = err.message;

    if (err.constructor.name === "CastError")
      error = handleCastErrorDB(error as { path: string; value: string });
    if (error.code === 11000)
      error = handleDuplicateFieldsDB(
        error as { errorResponse: { errmsg: string } }
      );
    if (err.constructor.name === "ValidationError")
      error = handleValidationErrorDB(
        error as { errors: { [key: string]: { message: string } } }
      );
    if (err.constructor.name === "JsonWebTokenError") error = handleJWTError();
    if (err.constructor.name === "TokenExpiredError")
      error = handleJWTExpiredError();

    sendErrorProd(
      error as {
        isOperational: boolean;
        status: string;
        message: string;
        statusCode: number;
      },
      req,
      res
    );
  }
};
