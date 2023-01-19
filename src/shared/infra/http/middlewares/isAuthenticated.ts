import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { authConfig } from '@config/auth';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { statusCode } from '@utils/statusCode';

interface IPayload {
  sub: string;
}

export async function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;
  const usersTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError('Token missing', statusCode.unauthorized);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      authConfig.secret_refresh_token,
    ) as IPayload;

    const user = await usersTokensRepository.findByUserIdAndRefreshToken({
      user_id,
      refresh_token: token,
    });

    if (!user) {
      throw new AppError('User does not exist', statusCode.notFound);
    }

    request.user = {
      id: user_id,
    };

    return next();
  } catch {
    throw new AppError('Invalid token!', statusCode.unauthorized);
  }
}
