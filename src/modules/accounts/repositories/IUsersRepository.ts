import { ICreateUserDTO } from '../dtos';

interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
