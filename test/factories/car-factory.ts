import { ICreateCarDTO } from '@modules/cars/dtos/';

type Override = Partial<ICreateCarDTO>;

export function makeCar(override: Override = {}) {
  return {
    name: 'Name car',
    description: 'Description car',
    daily_rate: 100,
    license_plate: '1234',
    fine_amount: 60,
    brand: 'Brand car',
    category_id: 'category_id-example',
    ...override,
  };
}
