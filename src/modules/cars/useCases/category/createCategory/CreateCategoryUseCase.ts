import { injectable, inject } from 'tsyringe';

import { AppError } from '../../../../../errors/AppError';
import { Singletons } from '../../../../../shared/container';
import { statusCode } from '../../../../../utils';
import { ICategoriesRepository } from '../../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject(Singletons.CategoriesRepository)
    private categoriesRepository: ICategoriesRepository,
  ) { }

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!', statusCode.conflict);
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
