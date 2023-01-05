import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { Singletons } from '@shared/container';
import { statusCode } from '@utils/statusCode';

interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

export interface IAuthenticateUserResponse {
  user: Omit<ICreateUserDTO, 'password' | 'driver_license'>;
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject(Singletons.UsersRepository)
    private usersRepository: IUsersRepository,
  ) { }

  async execute({
    email,
    password,
  }: IAuthenticateUserRequest): Promise<IAuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user)
      throw new AppError(
        'Email or password incorrect',
        statusCode.unauthorized,
      );

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch)
      throw new AppError(
        'Email or password incorrect',
        statusCode.unauthorized,
      );

    const token = sign({}, '5490f5b9758d9b33f2b37c3cbca45677', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      token,
      user: {
        email: user.email,
        name: user.name,
      },
    };
  }
}
