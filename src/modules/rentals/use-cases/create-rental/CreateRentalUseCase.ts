import dayjs from 'dayjs';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';
import { dateToUTC } from '@utils/dateToUTC';
import { statusCode } from '@utils/statusCode';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

export class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) { }

  async execute(data: IRequest): Promise<Rental> {
    const MINIMUN_HOUR_TO_RENT = 24;
    const carHasOpenRent = await this.rentalsRepository.findOpenRentalByCar(
      data.car_id,
    );

    if (carHasOpenRent)
      throw new AppError('Car is unavailable for rent', statusCode.conflict);

    const userHasOpenRent = await this.rentalsRepository.findOpenRentalByUser(
      data.user_id,
    );

    if (userHasOpenRent) {
      throw new AppError(
        'There is a rent in progress for this user',
        statusCode.conflict,
      );
    }

    const compareHoursDifference = dayjs(
      dateToUTC(data.expected_return_date),
    ).diff(dateToUTC(dayjs()), 'hours');

    if (compareHoursDifference < MINIMUN_HOUR_TO_RENT) {
      throw new AppError(
        `The minimum number of hours to rent is ${MINIMUN_HOUR_TO_RENT}`,
      );
    }

    const rental = await this.rentalsRepository.create(data);

    return rental;
  }
}
