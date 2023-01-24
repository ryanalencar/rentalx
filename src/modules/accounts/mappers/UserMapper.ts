import { IUserResponseDTO } from '../dtos';
import { User } from '../infra/typeorm/entities';

export class UserMapper {
  static toDTO({
    avatar,
    email,
    id,
    driver_license,
    name,
  }: User): IUserResponseDTO {
    return { avatar, driver_license, name, id, email };
  }
}
