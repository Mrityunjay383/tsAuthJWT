import dotenv from "dotenv";
dotenv.config();

import express, { Request,Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routers
import indexRouter from "./route/index";
import authRouter from "./route/auth";

const app: Application = express();
app.use(express.json());

app.use(cookieParser());

app.use(
    cors<Request>({
        origin: [
            "http://localhost:3000",
            "https://fb-helpdesk-mrityunjay.netlify.app",
        ], //change origin based on domain main of the application
        optionsSuccessStatus: 200,
        credentials: true,
    })
);

//Defining headers for cors
app.use(function (req, res, next) {
    res.header("Content-Type", "application/json;charset=UTF-8");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Using Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);

export default app;
