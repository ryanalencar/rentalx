import { DataSource } from 'typeorm';

import { User } from '../modules/accounts/entitites';
import { Category, Specification } from '../modules/cars/entities';

import 'reflect-metadata';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'rentx',
  entities: [Category, Specification, User],
  subscribers: [],
  migrations: ['src/database/migrations/*.ts'],
});

export function createConnection(host = 'rentx-database'): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;
