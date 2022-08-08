import { AppDataSource } from "../data-source";
import { Room } from "../Entities/Room";

const roomRepository = AppDataSource.getRepository(Room);

export { roomRepository };
