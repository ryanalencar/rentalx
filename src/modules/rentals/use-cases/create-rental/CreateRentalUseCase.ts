import dayjs from 'dayjs';
import { inject, injectable } from 'tsyringe';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { Singletons } from '@shared/container';
import { IDateProvider } from '@shared/container/providers/date-provider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { statusCode } from '@utils/statusCode';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject(Singletons.RentalsRepository)
    private rentalsRepository: IRentalsRepository,
    @inject(Singletons.DayjsDateProvider)
    private dateProvider: IDateProvider,
  ) { }

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

    const dateNow = this.dateProvider.dateNow();

    const compareHoursDifference = this.dateProvider.compareInHours(
      dateNow,
      data.expected_return_date,
    );

    if (compareHoursDifference < MINIMUN_HOUR_TO_RENT) {
      throw new AppError(
        `The minimum number of hours to rent is ${MINIMUN_HOUR_TO_RENT}`,
      );
    }

    const rental = await this.rentalsRepository.create(data);

    return rental;
  }
}
