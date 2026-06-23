import { Response } from "express";
import { TaskService } from "./task.service";

export class TaskController {
  static async create(req: any, res: Response) {
    const task = await TaskService.create(
      req.params.projectId,
      req.user.id,
      req.body,
    );

    res.status(201).json({
      success: true,
      data: task,
    });
  }

static async findAll(req: any, res: Response) {
  const result = await TaskService.findAll(
    req.params.projectId,
    req.user.id,
    req.query
  );

  res.status(200).json({
    success: true,
    ...result,
  });
}

  static async findOne(req: any, res: Response) {
    const task = await TaskService.findOne(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      data: task,
    });
  }

  static async update(req: any, res: Response) {
    const task = await TaskService.update(req.params.id, req.user.id, req.body);

    res.status(200).json({
      success: true,
      data: task,
    });
  }

  static async delete(req: any, res: Response) {
    await TaskService.delete(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  }
}
