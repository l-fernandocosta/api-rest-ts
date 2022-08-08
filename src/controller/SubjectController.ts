import { Request, Response } from "express";
import { subjectRepository } from "../repositories/subjectRepositories";

export class SubjectController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) res.status(400).json({ message: "The field name is required" });
    try {
      const newSubject = subjectRepository.create({ name });
      await subjectRepository.save(newSubject);

      return res.status(201).json(newSubject);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}
