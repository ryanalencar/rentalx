import { AppError } from '@shared/errors/AppError';
import { makeUser } from '@test/factories/user-factory';
import { UsersRepositoryInMemory } from '@test/repositories/UsersRepositoryInMemory';
import { statusCode } from '@utils/statusCode';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import {
  AuthenticateUserUseCase,
  IAuthenticateUserResponse,
} from './AuthenticateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );
  });

  it('should be able to authenticate an user', async () => {
    const user = makeUser();

    await createUserUseCase.execute(user);

    const authenticatedUser = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(authenticatedUser).toMatchObject<IAuthenticateUserResponse>({
      user: authenticatedUser.user,
      token: authenticatedUser.token,
    });
  });

  it('should not be able to authenticate a non existing user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'fake@example.com',
        password: '1234',
      }),
    ).rejects.toEqual(
      new AppError('Email or password incorrect', statusCode.unauthorized),
    );
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const user = makeUser();

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong-password',
      }),
    ).rejects.toEqual(
      new AppError('Email or password incorrect', statusCode.unauthorized),
    );
  });
});
