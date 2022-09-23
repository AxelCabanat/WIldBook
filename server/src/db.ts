import Wilder from "./entity/Wilder";
import Skill from "./entity/Skill";
import { DataSource } from "typeorm";
import Grade from "./entity/Grade";

const datasource = new DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  synchronize: true,
  entities: [Wilder, Skill, Grade],
  logging: ["query", "error"],
});

export default datasource;
