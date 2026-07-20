import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import "./config/container"
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { connectDB } from "./infrastructure/database/connection/connectDB";
import router from "./presentation/routes";
import { errorHandler } from "./shared/errors/error.middleware";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api", router);
app.use(errorHandler);

// app.get('/',(req,res)=>{
//     res.send('Hello world')
// })
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
