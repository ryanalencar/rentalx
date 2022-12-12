import { ICreateUserDTO } from '../dtos';
import { User } from '../entitites';

interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
