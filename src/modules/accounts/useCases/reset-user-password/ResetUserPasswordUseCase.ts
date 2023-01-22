import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { Singletons } from '@shared/container';
import { IDateProvider } from '@shared/container/providers/date-provider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { statusCode } from '@utils/statusCode';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetUserPasswordUseCase {
  constructor(
    @inject(Singletons.UsersTokensRepository)
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject(Singletons.UsersRepository)
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ password, token }: IRequest): Promise<void> {
    const HASH_SALT_NUMBER = 8;
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token,
    );

    if (!userToken) {
      throw new AppError('Token invalid!', statusCode.notFound);
    }

    const isTokenExpired = this.dateProvider.compareIfBefore(
      userToken.expires_date,
      this.dateProvider.dateNow(),
    );

    if (isTokenExpired) {
      throw new AppError('Token expired', statusCode.badRequest);
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, HASH_SALT_NUMBER);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}
