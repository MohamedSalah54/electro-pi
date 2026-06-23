import { Project } from "./project.model";

export class ProjectService {
  static async create(data: any, owner: string) {
    return await Project.create({
      ...data,
      owner,
    });
  }

  static async findAll(owner: string) {
    return await Project.find({ owner });
  }

  static async findById(id: string, owner: string) {
    const project = await Project.findOne({
      _id: id,
      owner,
    });

    if (!project) {
      throw {
        statusCode: 404,
        message: "Project not found",
      };
    }

    return project;
  }

  static async update(id: string, owner: string, data: any) {
    const project = await Project.findOneAndUpdate(
      {
        _id: id,
        owner,
      },
      data,
      {
        returnDocument: "after",
      },
    );

    if (!project) {
      throw {
        statusCode: 404,
        message: "Project not found",
      };
    }

    return project;
  }

  static async delete(id: string, owner: string) {
    const project = await Project.findOneAndDelete({
      _id: id,
      owner,
    });

    if (!project) {
      throw {
        statusCode: 404,
        message: "Project not found",
      };
    }

    return project;
  }
}
