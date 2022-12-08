import { inject, injectable } from 'tsyringe';

import { Singletons } from '../../../../../shared/container';
import { SpecificationsRepository } from '../../../repositories/implementations/SpecificationsRepository';

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
      throw new Error('Specification already exists');
    }

    await this.specificationsRepository.create({ description, name });
  }
}

export { CreateEspecificationUseCase };
