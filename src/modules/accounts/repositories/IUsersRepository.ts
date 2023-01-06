import { ICreateUserDTO } from '../dtos';
import { User } from '../infra/typeorm/entities';

interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };
