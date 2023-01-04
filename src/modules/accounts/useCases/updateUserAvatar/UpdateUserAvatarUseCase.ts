import { inject, injectable } from 'tsyringe';

import { Singletons } from '../../../../shared/container';
import { deleteFile } from '../../../../utils/file';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject(Singletons.UsersRepository)
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ avatar_file, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) await deleteFile(`./temp/avatar/${user.avatar}`);

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}
