import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../shared/error/AppError.js';
import { Prisma } from '@prisma/client';

export const errorHandler = (error: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {

}