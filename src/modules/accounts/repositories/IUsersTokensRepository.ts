import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../infra/typeorm/entities';

export interface IFindByUserIdAndRefreshTokenParams {
  user_id: string;
  refresh_token: string;
}

export interface IUsersTokensRepository {
  findByUserIdAndRefreshToken({
    refresh_token,
  }: IFindByUserIdAndRefreshTokenParams): Promise<UserTokens>;
  findByRefreshToken(refresh_token: string): Promise<UserTokens>;
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
}
