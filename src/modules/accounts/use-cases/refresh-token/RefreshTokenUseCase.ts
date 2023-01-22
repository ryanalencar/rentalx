import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { authConfig } from '@config/auth';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { Singletons } from '@shared/container';
import { IDateProvider } from '@shared/container/providers/date-provider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { statusCode } from '@utils/statusCode';

interface IRequest {
  token: string;
}

interface IJWTPayload {
  sub: string;
  email: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject(Singletons.UsersTokensRepository)
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) { }

  async execute({ token }: IRequest): Promise<string> {
    const { email, sub } = verify(
      token,
      authConfig.secret_refresh_token,
    ) as IJWTPayload;
    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = authConfig;
    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken({
        refresh_token: token,
        user_id,
      });

    if (!userToken) {
      throw new AppError('Refresh token not found', statusCode.notFound);
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days,
    );

    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id,
    });

    return refresh_token;
  }
}
