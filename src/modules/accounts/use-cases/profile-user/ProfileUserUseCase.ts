import { inject, injectable } from 'tsyringe';

import { IUserResponseDTO } from '@modules/accounts/dtos';
import { UserMapper } from '@modules/accounts/mappers/UserMapper';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { Singletons } from '@shared/container';

interface IRequest {
  user_id: string;
}

interface IResponse {
  user: IUserResponseDTO;
}

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject(Singletons.UsersRepository)
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ user_id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id);
    return {
      user: UserMapper.toDTO(user),
    };
  }
}
