import { Repository } from 'typeorm';

import AppDataSource from '../../../../database';
import { ICreateUserDTO } from '../../dtos';
import { User } from '../../entitites/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    driver_license,
    email,
    name,
    password,
    username,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      driver_license,
      email,
      name,
      password,
      username,
    });
    await this.repository.save(user);
  }
}

export { UsersRepository };
