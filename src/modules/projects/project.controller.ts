import { Request, Response } from "express";
import { ProjectService } from "./project.service";

export class ProjectController {
  static async create(req: any, res: Response) {
    const project = await ProjectService.create(req.body, req.user.id);

    res.status(201).json({
      success: true,
      data: project,
    });
  }

  static async findAll(req: any, res: Response) {
    const result = await ProjectService.findAll(req.user.id, req.query);

    res.status(200).json({
      success: true,
      ...result,
    });
  }

  static async findOne(req: any, res: Response) {
    const project = await ProjectService.findById(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      data: project,
    });
  }

  static async update(req: any, res: Response) {
    const project = await ProjectService.update(
      req.params.id,
      req.user.id,
      req.body,
    );

    res.status(200).json({
      success: true,
      data: project,
    });
  }

  static async delete(req: any, res: Response) {
    await ProjectService.delete(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      message: "Project deleted",
    });
  }
}
