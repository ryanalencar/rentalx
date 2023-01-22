import { DayjsDateProvider } from '@shared/container/providers/date-provider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { makeUser } from '@test/factories/user-factory';
import { MailProviderInMemory } from '@test/repositories/MailProviderInMemory';
import { UsersRepositoryInMemory } from '@test/repositories/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@test/repositories/UsersTokensRepositoryInMemory';
import { statusCode } from '@utils/statusCode';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe('Send forgot password mail', () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send forgot password email to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    const user = await usersRepositoryInMemory.create(makeUser());
    await sendForgotPasswordMailUseCase.execute({ email: user.email });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send forgot password email to a non-existing user', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute({
        email: 'non-existing-user@gmail.com',
      }),
    ).rejects.toEqual(new AppError('User not found', statusCode.notFound));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create',
    );

    const user = await usersRepositoryInMemory.create(makeUser());
    await sendForgotPasswordMailUseCase.execute({ email: user.email });

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
