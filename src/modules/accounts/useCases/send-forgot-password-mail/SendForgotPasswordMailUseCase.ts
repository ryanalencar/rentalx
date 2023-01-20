import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { Singletons } from '@shared/container';
import { IDateProvider } from '@shared/container/providers/date-provider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { statusCode } from '@utils/statusCode';

interface IRequest {
  email: string;
}

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject(Singletons.UsersRepository)
    private usersRepository: IUsersRepository,
    @inject(Singletons.UsersTokensRepository)
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) { }

  async execute({ email }: IRequest) {
    const TOKEN_HOURS_EXPIRATION = 3;
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', statusCode.notFound);
    }

    const token = uuidV4();
    const token_expiration_date = this.dateProvider.addHours(
      TOKEN_HOURS_EXPIRATION,
    );

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: token_expiration_date,
    });
  }
}
