import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import authRoutes from "./modules/auth/auth.route";
import projectRoutes from "./modules/projects/project.routes";
import taskRoutes from "./modules/tasks/task.route";
const app = express();

app.use(express.json());
app.use(errorMiddleware);
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api", taskRoutes);

export default app;
