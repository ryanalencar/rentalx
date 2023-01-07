import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

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
    @inject('CarsRepository') private carsRepository: ICarsRepository,
  ) { }
  async execute(data: ICreateCarRequest): Promise<void> {
    await this.carsRepository.create(data);
  }
}
