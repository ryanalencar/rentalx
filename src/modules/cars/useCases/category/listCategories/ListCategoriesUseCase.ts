import { inject, injectable } from 'tsyringe';

import { Category } from '@modules/cars/entities';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { Singletons } from '@shared/container';

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
