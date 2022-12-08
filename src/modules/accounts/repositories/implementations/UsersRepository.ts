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

  async create(data: ICreateUserDTO): Promise<void> {
    const user = this.repository.create(data);
    await this.repository.save(user);
  }
}

export { UsersRepository };
