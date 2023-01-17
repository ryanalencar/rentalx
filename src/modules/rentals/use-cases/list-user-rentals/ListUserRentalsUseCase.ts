import { inject, injectable } from 'tsyringe';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { Singletons } from '@shared/container';

interface IRequest {
  user_id: string;
}

@injectable()
export class ListUserRentalsUseCase {
  constructor(
    @inject(Singletons.RentalsRepository)
    private rentalsRepository: IRentalsRepository,
  ) { }

  async execute({ user_id }: IRequest): Promise<Rental[]> {
    const userRentals = await this.rentalsRepository.findByUser(user_id);
    return userRentals;
  }
}
