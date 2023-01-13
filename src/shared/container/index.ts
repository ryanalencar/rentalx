import { container } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import '@shared/container/providers';

export enum Singletons {
  CategoriesRepository = 'CategoriesRepository',
  SpecificationsRepository = 'SpecificationsRepository',
  UsersRepository = 'UsersRepository',
  CarsRepository = 'CarsRepository',
  CarsImagesRepository = 'CarsImagesRepository',
  RentalsRepository = 'RentalsRepository',
  DayjsDateProvider = 'DayjsDateProvider',
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

container.registerSingleton<ICarsImagesRepository>(
  Singletons.CarsImagesRepository,
  CarsImagesRepository,
);

container.registerSingleton<IRentalsRepository>(
  Singletons.RentalsRepository,
  RentalsRepository,
);
