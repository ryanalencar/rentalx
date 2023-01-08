import { DataSource } from 'typeorm';

import { User } from '@modules/accounts/infra/typeorm/entities';
import {
  Car,
  Category,
  Specification,
} from '@modules/cars/infra/typeorm/entities';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'rentx',
  entities: [Category, Specification, User, Car],
  subscribers: [],
  migrations: ['src/shared/infra/typeorm/migrations/*.ts'],
});

export function createConnection(host = 'rentx-database'): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}
