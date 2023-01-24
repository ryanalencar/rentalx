import { instanceToInstance } from 'class-transformer';

import { IUserResponseDTO } from '../dtos';
import { User } from '../infra/typeorm/entities';

export class UserMapper {
  static toDTO({
    avatar,
    email,
    id,
    driver_license,
    name,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      id,
      name,
      email,
      driver_license,
      avatar,
      avatar_url,
    });
    return user;
  }
}
