import { inject, injectable } from 'tsyringe';

import { Singletons } from '../../../../../shared/container';
import { Category } from '../../../entities/Category';
import { ICategoriesRepository } from '../../../repositories/ICategoriesRepository';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject(Singletons.CategoriesRepository)
    private categoriesRepository: ICategoriesRepository,
  ) { }

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}

export { ListCategoriesUseCase };
