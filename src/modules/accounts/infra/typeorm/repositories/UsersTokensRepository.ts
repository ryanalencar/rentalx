import { Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos';
import {
  IFindByUserIdAndRefreshTokenParams,
  IUsersTokensRepository,
} from '@modules/accounts/repositories/IUsersTokensRepository';
import { AppDataSource } from '@shared/infra/typeorm';

import { UserTokens } from '../entities';

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserTokens);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = await this.repository.findOneBy({ refresh_token });
    return userToken;
  }

  async findByUserIdAndRefreshToken({
    refresh_token,
    user_id,
  }: IFindByUserIdAndRefreshTokenParams): Promise<UserTokens> {
    const usersToken = this.repository.findOneBy({ user_id, refresh_token });
    return usersToken;
  }

  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create(data);
    await this.repository.save(userToken);
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
