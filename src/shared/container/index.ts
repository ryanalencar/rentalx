import { container } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

export enum Singletons {
  CategoriesRepository = 'CategoriesRepository',
  SpecificationsRepository = 'SpecificationsRepository',
  UsersRepository = 'UsersRepository',
  CarsRepository = 'CarsRepository',
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

container.registerSingleton<ICarsRepository>(
  Singletons.CarsRepository,
  CarsRepository,
);
