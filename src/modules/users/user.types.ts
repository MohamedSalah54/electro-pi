export enum UserRole {
  ADMIN = "admin",
  MEMBER = "member",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}