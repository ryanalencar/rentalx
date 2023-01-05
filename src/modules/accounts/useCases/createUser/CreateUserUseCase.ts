import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { Singletons } from '@shared/container';
import { statusCode } from '@utils/statusCode';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject(Singletons.UsersRepository)
    private usersRepository: IUsersRepository,
  ) { }

  async execute(data: ICreateUserDTO): Promise<void> {
    const HASH_SALT = 8;

    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email,
    );

    if (userAlreadyExists)
      throw new AppError('User already exists', statusCode.conflict);

    const user = {
      ...data,
      password: await hash(data.password, HASH_SALT),
    };
    await this.usersRepository.create(user);
  }
}

export { CreateUserUseCase };
