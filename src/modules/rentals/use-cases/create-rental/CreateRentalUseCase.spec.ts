import { AppError } from '@shared/errors/AppError';
import { makeRental } from '@test/factories/rental-factory';
import { RentalsRepositoryInMemory } from '@test/repositories/RentalsRepositoryInMemory';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it('shoud be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute(makeRental());

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if it already exists for the same user', async () => {
    await createRentalUseCase.execute(makeRental());
    expect(async () => {
      await createRentalUseCase.execute(makeRental());
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if it already exists for the same car', async () => {
    await createRentalUseCase.execute(makeRental({ user_id: '123' }));
    expect(async () => {
      await createRentalUseCase.execute(makeRental({ user_id: '321' }));
    }).rejects.toBeInstanceOf(AppError);
  });
});
