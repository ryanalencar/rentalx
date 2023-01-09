import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';
import { statusCode } from '@utils/statusCode';

interface IRequest {
  car_id: string;
  specifications: string[];
}

export class CreateCarSpecificationUseCase {
  constructor(private carsRepository: ICarsRepository) { }

  async execute({ car_id, specifications }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError('Car does not exists!', statusCode.badRequest);
    }
  }
}
