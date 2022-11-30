import { DataSource } from "typeorm";
import "reflect-metadata";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456",
  database: "rentx",
  entities: [],
  subscribers: [],
  migrations: ["src/database/migrations/*.ts"],
});

export function createConnection(host = "rentx-database"): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;
