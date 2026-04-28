import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

export interface CustomError extends Error {
  status?: number;
  code?: string;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';

  console.error({
    timestamp: new Date().toISOString(),
    status,
    message,
    path: req.path,
    method: req.method,
    ...(env.isDevelopment && { stack: err.stack }),
  });

  res.status(status).json({
    succes: false,
    error: message,
    ...(env.isDevelopment && { stack: err.stack, code: err.code }),
  });
};

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};