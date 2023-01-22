import { ICreateUserTokenDTO } from '@modules/accounts/dtos';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities';
import {
  IFindByUserIdAndRefreshTokenParams,
  IUsersTokensRepository,
} from '@modules/accounts/repositories/IUsersTokensRepository';

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async findByUserIdAndRefreshToken({
    refresh_token,
    user_id,
  }: IFindByUserIdAndRefreshTokenParams): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (_userToken) =>
        _userToken.user_id === user_id &&
        _userToken.refresh_token === refresh_token,
    );
    return userToken;
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (_userToken) => _userToken.refresh_token === refresh_token,
    );
    return userToken;
  }

  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();
    Object.assign(userToken, data);
    this.usersTokens.push(userToken);
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = await this.usersTokens.find(
      (_userToken) => _userToken.id === id,
    );
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }
}
