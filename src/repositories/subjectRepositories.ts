import { AppDataSource } from "../data-source";
import { Subject } from "../Entities/Subject";

const subjectRepository = AppDataSource.getRepository(Subject);

export { subjectRepository };
