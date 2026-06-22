import express from "express";
import authRoutes from "./modules/auth/auth.route";
import { errorMiddleware } from "./middlewares/error.middleware";
const app = express();

app.use(express.json());
app.use(errorMiddleware);
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);

export default app;
