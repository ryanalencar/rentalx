import { inject, injectable } from 'tsyringe';

import { Singletons } from '../../../../../shared/container';
import { Specification } from '../../../entities/Specification';
import { ISpecificationsRepository } from '../../../repositories/ISpecificationsRepository';

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
