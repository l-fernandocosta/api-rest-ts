import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { Room } from "./Entities/Room";
import { Video } from "./Entities/VIdeo";
import { Subject } from "./Entities/Subject";

const port = Number(process.env.DB_PORT);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Room, Video, Subject],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});
