import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import dotenv from "dotenv"
import mongoose from "mongoose";

import authRouter from "./routes/auth";
import { ApiError } from "./models/ApiError";


dotenv.config()
const app = express();
app.use(json());

app.use((_req:Request,res:Response,next:NextFunction)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods',"GET,POST,PUT,PATCH,DELETE")
    res.setHeader('Access-Control-Allow-Headers',"Content-Type, Authorization")
    next();
})
app.use("/auth", authRouter);

app.use((err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.statusCode).json(err.name);
});
mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bawdpwj.mongodb.net/`
    )
    .then((_result) => app.listen(process.env.PORT,()=>{console.log(`Listning on port ${process.env.PORT}`)}))
    .catch((error) => {
        throw error
    });
