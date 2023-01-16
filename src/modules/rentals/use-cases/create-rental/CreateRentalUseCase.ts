import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
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
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject(Singletons.CarsRepository)
    private carsRepository: ICarsRepository,
  ) { }

  async execute(data: IRequest): Promise<Rental> {
    const MINIMUN_HOUR_TO_RENT = 24;
    const { car_id, expected_return_date, user_id } = data;

    const carHasOpenRent = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );

    if (carHasOpenRent)
      throw new AppError('Car is unavailable for rent', statusCode.conflict);

    const userHasOpenRent = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
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
      expected_return_date,
    );

    if (compareHoursDifference < MINIMUN_HOUR_TO_RENT) {
      throw new AppError(
        `The minimum number of hours to rent is ${MINIMUN_HOUR_TO_RENT}`,
      );
    }

    const rental = await this.rentalsRepository.create(data);

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}
