import { makeCar } from '@test/factories/car-factory';
import { CarsRepositoryInMemory } from '@test/repositories/CarsRepositoryInMemory';

import { CreateCarUseCase } from '../create-car/CreateCarUseCase';
import { ListAvailableCarsUsecase } from './ListAvailableCarsUsecase';

let listCarsUseCase: ListAvailableCarsUsecase;
let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('List cars', () => {
  beforeEach(async () => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
    listCarsUseCase = new ListAvailableCarsUsecase(carsRepository);
  });
  it('should be able to list all available cars', async () => {
    const car1 = makeCar();
    const car2 = makeCar({ license_plate: 'XXXX' });
    const car3 = makeCar({ license_plate: 'YYYY' });

    await createCarUseCase.execute(car1);
    await createCarUseCase.execute(car2);
    await createCarUseCase.execute(car3);

    const cars = await listCarsUseCase.execute({});

    expect(cars).toHaveLength(3);
  });

  it('should be able to list cars by name', async () => {
    const car1 = makeCar({ license_plate: 'AAAAA' });
    const car2 = makeCar({ license_plate: 'BBBBB' });
    const car3 = makeCar({ name: 'Different name', license_plate: 'CCCCC' });

    await createCarUseCase.execute(car1);
    await createCarUseCase.execute(car2);
    await createCarUseCase.execute(car3);

    const cars = await listCarsUseCase.execute({ name: car3.name });

    expect(cars).toHaveLength(1);
  });

  it('should be able to list cars by category', async () => {
    const car1 = makeCar({ license_plate: 'AAAAA' });
    const car2 = makeCar({ license_plate: 'BBBBB' });
    const car3 = makeCar({ category_id: '123456', license_plate: 'CCCCC' });

    await createCarUseCase.execute(car1);
    await createCarUseCase.execute(car2);
    await createCarUseCase.execute(car3);

    const cars = await listCarsUseCase.execute({
      category_id: car3.category_id,
    });

    expect(cars).toHaveLength(1);
  });

  it('should be able to list cars by brand', async () => {
    const car1 = makeCar({ license_plate: 'AAAAA' });
    const car2 = makeCar({ license_plate: 'BBBBB' });
    const car3 = makeCar({ brand: 'Different brand', license_plate: 'CCCCC' });

    await createCarUseCase.execute(car1);
    await createCarUseCase.execute(car2);
    await createCarUseCase.execute(car3);

    const cars = await listCarsUseCase.execute({ brand: car3.brand });

    expect(cars).toHaveLength(1);
  });
});
