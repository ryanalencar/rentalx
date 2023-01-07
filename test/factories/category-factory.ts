import { ICreateCategoryDTO } from '@modules/cars/dtos';

type Override = Partial<ICreateCategoryDTO>;

export function makeCategory(override: Override = {}) {
  return {
    name: 'Test Category',
    description: 'This is a test category',
    ...override,
  };
}
