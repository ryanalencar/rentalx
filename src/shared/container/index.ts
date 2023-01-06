import { container } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

export enum Singletons {
  CategoriesRepository = 'CategoriesRepository',
  SpecificationsRepository = 'SpecificationsRepository',
  UsersRepository = 'UsersRepository',
}

container.registerSingleton<ICategoriesRepository>(
  Singletons.CategoriesRepository,
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  Singletons.SpecificationsRepository,
  SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
  Singletons.UsersRepository,
  UsersRepository,
);
