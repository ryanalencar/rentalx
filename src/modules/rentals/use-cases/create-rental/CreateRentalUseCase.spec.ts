import dayjs from 'dayjs';

import { DayjsDateProvider } from '@shared/container/providers/date-provider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { makeRental } from '@test/factories/rental-factory';
import { RentalsRepositoryInMemory } from '@test/repositories/RentalsRepositoryInMemory';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const add24HoursDate = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
    );
  });

  it('shoud be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute(
      makeRental({ expected_return_date: add24HoursDate }),
    );

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('shoud not be able to create a new rental as expected date return is less than [NUMBER_OF_HOURS]', async () => {
    expect(async () => {
      await createRentalUseCase.execute(makeRental());
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if it already exists for the same user', async () => {
    await createRentalUseCase.execute(
      makeRental({ expected_return_date: add24HoursDate }),
    );
    expect(async () => {
      await createRentalUseCase.execute(
        makeRental({ expected_return_date: add24HoursDate }),
      );
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if it already exists for the same car', async () => {
    await createRentalUseCase.execute(
      makeRental({ user_id: '123', expected_return_date: add24HoursDate }),
    );
    expect(async () => {
      await createRentalUseCase.execute(
        makeRental({ user_id: '321', expected_return_date: add24HoursDate }),
      );
    }).rejects.toBeInstanceOf(AppError);
  });
});
