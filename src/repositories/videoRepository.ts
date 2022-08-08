import { AppDataSource } from "../data-source";
import { Video } from "../Entities/VIdeo";

const videoRepository = AppDataSource.getRepository(Video);

export { videoRepository };
