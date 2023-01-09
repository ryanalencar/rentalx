import { ICreateCarDTO } from '../dtos';
import { Car } from '../infra/typeorm/entities';

export interface IFindAvailableParams {
  brand?: string;
  category_id?: string;
  name?: string;
}

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(params: IFindAvailableParams): Promise<Car[]>;
}
