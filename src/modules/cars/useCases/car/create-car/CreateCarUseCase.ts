import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Singletons } from '@shared/container';
import { AppError } from '@shared/errors/AppError';
import { statusCode } from '@utils/statusCode';

interface ICreateCarRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject(Singletons.CarsRepository)
    private carsRepository: ICarsRepository,
  ) { }
  async execute(data: ICreateCarRequest): Promise<Car> {
    const { license_plate } = data;

    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate,
    );

    if (carAlreadyExists) {
      throw new AppError('Car already exists', statusCode.conflict);
    }

    const car = await this.carsRepository.create(data);

    return car;
  }
}
