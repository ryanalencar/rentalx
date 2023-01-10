import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';

type Override = Partial<ICreateSpecificationDTO>;

export function makeSpecification(override: Override = {}) {
  return {
    name: 'Test specification',
    description: 'This is a test specification',
    ...override,
  };
}
