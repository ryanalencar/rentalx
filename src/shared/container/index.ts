import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/SpecificationsRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository';

export enum Singletons {
  CategoriesRepository = 'CategoriesRepository',
  SpecificationsRepository = 'SpecificationsRepository',
}

container.registerSingleton<ICategoriesRepository>(
  Singletons.CategoriesRepository,
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  Singletons.SpecificationsRepository,
  SpecificationsRepository,
);
