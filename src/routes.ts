import { Router } from "express";
import { RoomController } from "./controller/RoomController";
import { SubjectController } from "./controller/SubjectController";

const routes = Router();
const room = new RoomController();
const subject = new SubjectController();

routes.post("/subject", subject.create);
routes.post("/room", room.create);
routes.post("/create-video/:room_id", room.createVideo);
routes.post("/new-subject/:room_id", room.createRoomSubject);
routes.get("/room", room.list);

export { routes };
