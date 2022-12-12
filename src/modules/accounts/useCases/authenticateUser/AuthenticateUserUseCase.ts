import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { Singletons } from '../../../../shared/container';
import { ICreateUserDTO } from '../../dtos';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

interface IAuthenticateUserResponse {
  user: Omit<ICreateUserDTO, 'password' | 'driver_license'>;
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject(Singletons.UsersRepository)
    private usersRepository: IUsersRepository,
  ) { }

  async execute({
    email,
    password,
  }: IAuthenticateUserRequest): Promise<IAuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new Error('Email or password incorrect');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new Error('Email or password incorrect');

    const token = sign({}, '5490f5b9758d9b33f2b37c3cbca45677', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      token,
      user: {
        email: user.email,
        name: user.name,
      },
    };
  }
}

export { AuthenticateUserUseCase };
