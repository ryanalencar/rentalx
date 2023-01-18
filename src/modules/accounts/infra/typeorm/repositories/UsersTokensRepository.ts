import { Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AppDataSource } from '@shared/infra/typeorm';

import { UserTokens } from '../entities';

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserTokens);
  }

  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create(data);
    await this.repository.save(userToken);
    return userToken;
  }
}
