import { DataSource } from "typeorm";

export const Database = new DataSource({
  type: "postgres",
  host: "rentx-database",
  port: 5432,
  username: "postgres",
  password: "123456",
  database: "rentx",
  entities: [],
  subscribers: [],
  migrations: [],
});

Database.initialize()
  .then(() => {
    console.log("Database initialized");
  })
  .catch((error) => console.log(error));
