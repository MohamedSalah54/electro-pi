import { User } from "../modules/users/user.model";
import { Project } from "../modules/projects/project.model";
import { Task } from "../modules/tasks/task.model";
import { hashPassword } from "../utils/hash";
import { connectDB } from "../configs/db";
import { UserRole } from "../modules/users/user.types";
import { ProjectStatus } from "../modules/projects/project.types";
import { TaskPriority, TaskStatus } from "../modules/tasks/task.types";

const runSeed = async () => {
  await connectDB();

  console.log("Seeding started...");

  // Create a user
  const hashedPassword = await hashPassword("123456");

  const user = await User.create({
    name: "Admin",
    email: "admin1@test.com",
    password: hashedPassword,
    role: UserRole.ADMIN,
  });

  //  Create a project
  const project = await Project.create({
    title: "Seed Project",
    description: "This is a seeded project",
    status: ProjectStatus.ACTIVE,
    owner: user._id,
  });

  //  Create a task
  await Task.create({
    title: "Create auth",
    description: "Build login & register",
    status: TaskStatus.PENDING,
    priority: TaskPriority.MEDIUM,
    dueDate: new Date("2027-02-01"),
    project: project._id,
  });

  console.log("Seeding completed 🚀");

  process.exit();
};

runSeed();
