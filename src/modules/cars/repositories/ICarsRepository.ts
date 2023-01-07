import { ICreateCarDTO } from '../dtos';
import { Car } from '../infra/typeorm/entities';

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
}
