import express from "express";

import dotenv from "dotenv";
import { ConnectionDB } from "./app/config/database/db_connection.js";

import router from "./app/routes/auth/auth_route.js";

dotenv.config();
// const mongoURI = 'mongodb://mongodb:27017/your_database_name';

const app = express();
app.use(express.json());
app.use("/api/user", router);

// app.use("/api/auth",router)

function Start() {
  app.listen(process.env.PORT, () => {
    console.log(`server is running in port ${process.env.PORT}`);
  });
  ConnectionDB();
}

Start();
