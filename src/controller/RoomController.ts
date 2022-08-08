import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";
import { subjectRepository } from "../repositories/subjectRepositories";
import { videoRepository } from "../repositories/videoRepository";

export class RoomController {
  async create(request: Request, response: Response) {
    const { name, description } = request.body;

    if (!name || !description)
      response
        .status(400)
        .json({ message: "required fields: name and description" });
    try {
      const newRoom = roomRepository.create({ name, description });
      await roomRepository.save(newRoom);
      return response.status(201).json(newRoom);
    } catch (err) {
      console.log(err);
      return response.status(500).json(err);
    }
  }

  async createVideo(request: Request, response: Response) {
    const { title, url } = request.body;
    const { room_id } = request.params;

    if (!title || !url || !room_id) {
      response
        .status(401)
        .json({ message: "Missing required fields, see documentation" });
    }

    try {
      const room = await roomRepository.findOneBy({ id: room_id });

      if (!room) {
        response.status(404).json({ message: "Can`t find this room" });
      } else {
        const newVideo = videoRepository.create({
          title: title,
          url: url,
          room,
        });

        videoRepository.save(newVideo);
        return response.status(201).json(newVideo);
      }
    } catch (err) {
      console.log(err);
      return response.status(401).json(err);
    }
  }

  async createRoomSubject(request: Request, response: Response) {
    const { subject_id } = request.body;
    const { room_id } = request.params;

    if (!subject_id || !room_id) {
      return response
        .status(400)
        .json({ error: "Please, complete with the required fields" });
    }

    try {
      const room = await roomRepository.findOneBy({ id: room_id });
      if (!room) {
        return response.status(404).json({ error: "Can`t find this room" });
      }

      const subject = await subjectRepository.findOneBy({ id: subject_id });
      if (!subject) {
        response.status(404).json({ error: "Can`t find this subject" });
      } else {
        const roomUpdate = {
          ...room,
          subjects: [subject],
        };
        await roomRepository.save(roomUpdate);
        return response.status(201).json(room);
      }
    } catch (err) {
      console.log(err);
      return response.status(400).json(err);
    }
  }

  async list(request: Request, response: Response) {
    try {
      const rooms = await roomRepository.find({
        relations: {
          subjects: true,
        },
      });

      return response.status(200).json(rooms);
    } catch (err) {
      console.log(err);
      return response.status(400).json(err);
    }
  }
}
