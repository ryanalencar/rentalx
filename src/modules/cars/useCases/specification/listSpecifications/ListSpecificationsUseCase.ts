import { inject, injectable } from 'tsyringe';

import { Specification } from '@modules/cars/infra/typeorm/entities';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { Singletons } from '@shared/container';

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject(Singletons.SpecificationsRepository)
    private specificationsRepository: ISpecificationsRepository,
  ) { }

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationsRepository.list();
    return specifications;
  }
}

export { ListSpecificationsUseCase };
