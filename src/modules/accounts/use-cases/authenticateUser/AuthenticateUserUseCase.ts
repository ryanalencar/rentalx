import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { authConfig } from '@config/auth';
import { ICreateUserDTO } from '@modules/accounts/dtos';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { Singletons } from '@shared/container';
import { IDateProvider } from '@shared/container/providers/date-provider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { statusCode } from '@utils/statusCode';

interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

export interface IAuthenticateUserResponse {
  user: Omit<ICreateUserDTO, 'password' | 'driver_license'>;
  token: string;
  refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject(Singletons.UsersRepository)
    private usersRepository: IUsersRepository,
    @inject(Singletons.UsersTokensRepository)
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) { }

  async execute({
    email,
    password,
  }: IAuthenticateUserRequest): Promise<IAuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const {
      expires_in_token,
      secret_refresh_token,
      secret_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = authConfig;

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

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days,
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      expires_date: refresh_token_expires_date,
      refresh_token,
    });

    return {
      token,
      refresh_token,
      user: {
        email: user.email,
        name: user.name,
      },
    };
  }
}
