import { Types } from "mongoose";

export enum ProjectStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
}

export interface IProject {
  title: string;
  description: string;
  status: ProjectStatus;
  owner: Types.ObjectId;
}

export interface CreateProjectDto {
  title: string;
  description: string;
  status?: ProjectStatus;
}

export interface UpdateProjectDto {
  title?: string;
  description?: string;
  status?: ProjectStatus;
}
