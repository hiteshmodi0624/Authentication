import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import dotenv from "dotenv"
dotenv.config()
import authRouter from "./routes/auth";
import { ApiError } from "./errors/apiError";

const app = express();

app.use(json());

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/auth", authRouter);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode).json(err.name);
});

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));