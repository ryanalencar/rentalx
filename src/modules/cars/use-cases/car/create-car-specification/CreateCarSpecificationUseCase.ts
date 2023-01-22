import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { Singletons } from '@shared/container';
import { AppError } from '@shared/errors/AppError';
import { statusCode } from '@utils/statusCode';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject(Singletons.CarsRepository)
    private carsRepository: ICarsRepository,

    @inject(Singletons.SpecificationsRepository)
    private specificationsRepository: ISpecificationsRepository,
  ) { }

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError('Car does not exists!', statusCode.badRequest);
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id,
    );

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);

    return carExists;
  }
}
