import expres, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import { dbConnect } from "./config/db";
import  seed  from "./config/seed";
import { errorHandler } from "./middlewares/errorHandler/errorHandler";
import userRouter from "./routes/userRoutes";
import fileUploadRouter from "./routes/fileUploadRoutes";
import fileupload from "express-fileupload";

const app: Express = expres();

app.use(cors()); // Use the cors middleware
app.use(expres.json());
app.use(
  fileupload({ useTempFiles: true, limits: { fileSize: 50 * 1024 * 1024 } })
);

app.use("/api/user", userRouter);
app.use("/api/file-upload", fileUploadRouter);
app.use(errorHandler);

const startServer = async () => {
  await dbConnect(app);
  await seed();
};

startServer();
