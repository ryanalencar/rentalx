import { Request, Response } from 'express';

import { AppError } from '../errors/AppError';

export async function handleErrors(
  err: Error,
  request: Request,
  response: Response,
) {
  if (err instanceof AppError) {
    const { message, statusCode } = err;
    return response.status(statusCode).json({ message });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal Server Error - ${err.message}`,
  });
}
