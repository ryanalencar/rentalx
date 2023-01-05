import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository';
import { Singletons } from '@shared/container';
import { statusCode } from '@utils/statusCode';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateEspecificationUseCase {
  constructor(
    @inject(Singletons.SpecificationsRepository)
    private specificationsRepository: SpecificationsRepository,
  ) { }

  async execute({ description, name }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists', statusCode.conflict);
    }

    await this.specificationsRepository.create({ description, name });
  }
}

export { CreateEspecificationUseCase };
