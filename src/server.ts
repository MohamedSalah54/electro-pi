import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./configs/db";
import { env } from "./configs/env";

dotenv.config();

const PORT = env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
startServer();
