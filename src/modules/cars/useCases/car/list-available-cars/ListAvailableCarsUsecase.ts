import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Singletons } from '@shared/container';

interface IRequest {
  brand?: string;
  category_id?: string;
  name?: string;
}

@injectable()
export class ListAvailableCarsUsecase {
  constructor(
    @inject(Singletons.CarsRepository)
    private carsRepository: ICarsRepository,
  ) { }

  async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable({
      brand,
      category_id,
      name,
    });
    return cars;
  }
}
