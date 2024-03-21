import dotenv from "dotenv";
dotenv.config();
require("./config/database").connect();

import express, { Application } from "express";
import cookieParser from "cookie-parser";

// Routers
import indexRouter from "./route/index";
import authRouter from "./route/auth";

const app: Application = express();
app.use(express.json());

app.use(cookieParser());

// Using Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);

export default app;
