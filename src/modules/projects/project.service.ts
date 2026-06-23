import { Project } from "./project.model";

export class ProjectService {
  static async create(data: any, owner: string) {
    return await Project.create({
      ...data,
      owner,
    });
  }

  static async findAll(owner: string, query: any) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;

    const skip = (page - 1) * limit;

    const sortBy = query.sort || "createdAt";
    const order = query.order === "asc" ? 1 : -1;

    const projects = await Project.find({ owner })
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    const total = await Project.countDocuments({ owner });

    return {
      data: projects,
      pagination: {
        total,
        page,
        limit,
      },
    };
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
