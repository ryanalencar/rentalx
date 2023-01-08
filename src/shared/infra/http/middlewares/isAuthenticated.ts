import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { statusCode } from '@utils/statusCode';

interface ITokenPayload {
  sub: string;
}

export async function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { authorization } = request.headers;

    if (!authorization)
      throw new AppError('Token is missing!', statusCode.unauthorized);

    const [, token] = authorization.split(' ');

    const { sub: user_id } = verify(
      token,
      '5490f5b9758d9b33f2b37c3cbca45677',
    ) as ITokenPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user)
      throw new AppError('User does not exist', statusCode.unauthorized);

    request.user = { id: user_id };

    next();
  } catch (error) {
    throw new AppError(error, statusCode.unauthorized);
  }
}