import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes";
import { globalErrorHandler } from "./controllers/errorController";
import { AppError } from "./utils/appError";

dotenv.config();

mongoose
  .connect(process.env.MONGO as string)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err: any) => {
    console.log(err);
  });

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use("/api/auth", authRouter);

app.all("*", (req: Request, res: Response, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server`, 404)
  );
});

app.use(globalErrorHandler);
