import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';
import { statusCode } from '@utils/statusCode';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

export class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) { }

  async execute(data: IRequest): Promise<Rental> {
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

    const rental = await this.rentalsRepository.create(data);

    return rental;
  }
}
