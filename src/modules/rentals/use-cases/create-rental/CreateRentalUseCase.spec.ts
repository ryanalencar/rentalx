import dayjs from 'dayjs';

import { DayjsDateProvider } from '@shared/container/providers/date-provider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { makeCar } from '@test/factories/car-factory';
import { makeRental } from '@test/factories/rental-factory';
import { CarsRepositoryInMemory } from '@test/repositories/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@test/repositories/RentalsRepositoryInMemory';
import { statusCode } from '@utils/statusCode';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const add24HoursDate = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it('shoud be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create(makeCar());
    const rental = await createRentalUseCase.execute(
      makeRental({ expected_return_date: add24HoursDate, car_id: car.id }),
    );

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('shoud not be able to create a new rental as expected date return is less than [NUMBER_OF_HOURS]', async () => {
    await expect(createRentalUseCase.execute(makeRental())).rejects.toEqual(
      new AppError(`The minimum number of hours to rent is ${24}`),
    );
  });

  it('should not be able to create a new rental if it already exists for the same user', async () => {
    await rentalsRepositoryInMemory.create(
      makeRental({ expected_return_date: add24HoursDate, car_id: '1111' }),
    );

    await expect(
      createRentalUseCase.execute(
        makeRental({ expected_return_date: add24HoursDate, car_id: '2222' }),
      ),
    ).rejects.toEqual(
      new AppError(
        'There is a rent in progress for this user',
        statusCode.conflict,
      ),
    );
  });

  it('should not be able to create a new rental if it already exists for the same car', async () => {
    await rentalsRepositoryInMemory.create(
      makeRental({ expected_return_date: add24HoursDate, car_id: '1111' }),
    );
    await expect(
      createRentalUseCase.execute(
        makeRental({
          user_id: '321',
          expected_return_date: add24HoursDate,
          car_id: '1111',
        }),
      ),
    ).rejects.toEqual(
      new AppError('Car is unavailable for rent', statusCode.conflict),
    );
  });
});
