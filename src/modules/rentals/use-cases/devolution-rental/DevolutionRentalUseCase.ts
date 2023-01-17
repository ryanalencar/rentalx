import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { Singletons } from '@shared/container';
import { IDateProvider } from '@shared/container/providers/date-provider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { statusCode } from '@utils/statusCode';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject(Singletons.RentalsRepository)
    private rentalsRepository: IRentalsRepository,
    @inject(Singletons.CarsRepository)
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) { }

  async execute({ id, user_id }: IRequest) {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);

    const MINIMUM_DAILY = 1;

    if (!rental) {
      throw new AppError('Rental does not exist', statusCode.notFound);
    }

    const dateNow = this.dateProvider.dateNow();

    let rentalDaily = this.dateProvider.compareInDays(
      rental.start_date,
      dateNow,
    );

    if (rentalDaily <= 0) {
      rentalDaily = MINIMUM_DAILY;
    }

    const rentalDelay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date,
    );

    let totalRentalPrice = 0;
    if (rentalDelay > 0) {
      const calculateFine = rentalDelay * car.fine_amount;
      totalRentalPrice = calculateFine;
    }
    totalRentalPrice += rentalDaily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = totalRentalPrice;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}
