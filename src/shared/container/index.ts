import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';

export enum Singletons {
  CategoriesRepository = 'CategoriesRepository',
}

container.registerSingleton<ICategoriesRepository>(
  Singletons.CategoriesRepository,
  CategoriesRepository,
);
