import { inject, injectable } from 'tsyringe';

import { Specification } from '@modules/cars/infra/typeorm/entities';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { Singletons } from '@shared/container';
import { AppError } from '@shared/errors/AppError';
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

  async execute({ description, name }: IRequest): Promise<Specification> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists', statusCode.conflict);
    }

    const specification = await this.specificationsRepository.create({
      description,
      name,
    });

    return specification;
  }
}

export { CreateEspecificationUseCase };
