import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

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

    if (!authorization) throw new Error('Token is missing!');

    const [, token] = authorization.split(' ');

    const { sub: user_id } = verify(
      token,
      '5490f5b9758d9b33f2b37c3cbca45677',
    ) as ITokenPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) throw new Error('User does not exist');

    next();
  } catch (error) {
    throw new Error(error);
  }
}
