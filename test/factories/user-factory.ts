import { ICreateUserDTO } from '../../src/modules/accounts/dtos';

type Override = Partial<ICreateUserDTO>;

export function makeUser(override: Override = {}): Override {
  return {
    name: 'user',
    email: 'user@example.com',
    driver_license: '123456789',
    password: '1234',
    ...override,
  };
}
