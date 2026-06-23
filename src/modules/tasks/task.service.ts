import { Task } from "./task.model";
import { Project } from "../projects/project.model";

export class TaskService {
  static async create(projectId: string, userId: string, data: any) {
    const project = await Project.findOne({
      _id: projectId,
      owner: userId,
    });

    if (!project) {
      throw {
        statusCode: 404,
        message: "Project not found",
      };
    }

    return await Task.create({
      ...data,
      project: projectId,
    });
  }

  static async findAll(
    projectId: string,
    userId: string,
    status?: string,
    priority?: string,
  ) {
    const project = await Project.findOne({
      _id: projectId,
      owner: userId,
    });

    if (!project) {
      throw {
        statusCode: 404,
        message: "Project not found",
      };
    }

    const filter: any = {
      project: projectId,
    };

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    return await Task.find(filter);
  }

  static async findOne(id: string, userId: string) {
    const task = await Task.findById(id).populate("project");

    if (!task) {
      throw {
        statusCode: 404,
        message: "Task not found",
      };
    }

    const project: any = task.project;

    if (project.owner.toString() !== userId) {
      throw {
        statusCode: 403,
        message: "Forbidden",
      };
    }

    return task;
  }

  static async update(id: string, userId: string, data: any) {
    const task = await this.findOne(id, userId);

    Object.assign(task, data);

    await task.save();

    return task;
  }

  static async delete(id: string, userId: string) {
    const task = await this.findOne(id, userId);

    await task.deleteOne();

    return true;
  }
}
