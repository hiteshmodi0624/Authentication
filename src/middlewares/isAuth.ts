import { RequestHandler } from "express"

import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { ApiError } from "../errors/apiError"
dotenv.config()

const isAuth:RequestHandler=(req,res,next)=>{
    const authHeader=req.get("Authorization")
    if(!authHeader){
        const err=new ApiError("Not Authenticated",401)
        next(err);
    }
    const token=authHeader!.split(" ")[1];
    try {
        var decodedToken=jwt.verify(token,process.env.JSONSECRET!)
        if(!decodedToken){
            const err=new ApiError("Not Authenticated",401)
            next(err);
        }
        if(typeof decodedToken!=='string'&& 'userId' in decodedToken)
            req.userId=decodedToken.userId
    } catch (error) {
        const err=new ApiError(error.message,500)
        next(err);
    }
    
    next();
}
export default isAuth