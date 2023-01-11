import { ICreateCarImageDTO } from '@modules/cars/dtos/ICreateCarImageDTO';

type Override = Partial<ICreateCarImageDTO>;

export function makeCarImage(override: Override = {}) {
  return {
    car_id: 'car-id-example',
    image_name: 'Image car',
    ...override,
  };
}
