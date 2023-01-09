import { ICreateCarDTO } from '@modules/cars/dtos';
import { Car } from '@modules/cars/infra/typeorm/entities';
import {
  ICarsRepository,
  IFindAvailableParams,
} from '@modules/cars/repositories/ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async findById(id: string): Promise<Car> {
    const car = this.cars.find((_car) => _car.id === id);
    return car;
  }

  async findAvailable(params: IFindAvailableParams): Promise<Car[]> {
    const { brand, category_id, name } = params;

    let availableCars = this.cars.filter((car) => car.available);

    if (!brand && !category_id && !name) return availableCars;

    availableCars = availableCars.filter((car) => {
      if (car.name === name) return true;
      if (car.brand === brand) return true;
      if (car.category_id === category_id) return true;

      return false;
    });

    return availableCars;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find(
      (_category) => _category.license_plate === license_plate,
    );
    return car;
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, data);
    this.cars.push(car);
    return car;
  }
}
