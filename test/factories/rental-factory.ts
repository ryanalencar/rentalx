import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRental';

type Override = Partial<ICreateRentalDTO>;

export function makeRental(override: Override = {}) {
  return {
    user_id: 'user-id-example',
    car_id: 'car-id-example',
    expected_return_date: new Date(),
    ...override,
  };
}
