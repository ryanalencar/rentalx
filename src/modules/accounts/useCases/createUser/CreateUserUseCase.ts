import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { Singletons } from '../../../../shared/container';
import { ICreateUserDTO } from '../../dtos';
import { IUsersRepository } from '../../repositories/IUsersRepository';

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

    if (userAlreadyExists) throw new Error('User already exists');

    const user = {
      ...data,
      password: await hash(data.password, HASH_SALT),
    };
    await this.usersRepository.create(user);
  }
}

export { CreateUserUseCase };
