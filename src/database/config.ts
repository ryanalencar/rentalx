import { DataSource } from "typeorm";

export const Database = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456",
  database: "rentx",
  entities: [],
  subscribers: [],
  migrations: [],
});
