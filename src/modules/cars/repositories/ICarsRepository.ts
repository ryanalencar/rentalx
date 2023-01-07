import { ICreateCarDTO } from '../dtos';
import { Car } from '../infra/typeorm/entities';

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<void>;
  findByLicensePlate(license_plate: string): Promise<Car>;
}
