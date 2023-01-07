import { ICreateCarDTO } from '../dtos';

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<void>;
}
