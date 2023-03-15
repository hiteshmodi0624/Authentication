"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../models/ApiError");
const err = new ApiError_1.ApiError("Not Authenticated", 401);
const isAuth = (req, _res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        next(err);
    }
    const token = authHeader.split(" ")[1];
    try {
        var decodedToken = jsonwebtoken_1.default.verify(token, process.env.JSONSECRET);
        if (!decodedToken)
            next(err);
        if (typeof decodedToken !== 'string' && 'userId' in decodedToken)
            req.userId = decodedToken.userId;
        else
            next(err);
    }
    catch (error) {
        if (typeof error === "string") {
            err.update(error, 500);
        }
        else if (error instanceof Error) {
            err.update(error.message, 500);
        }
        else if (error instanceof (Array)) {
            err.update(error.reduce((curr, e) => e + curr));
        }
        next(err);
    }
    next();
};
exports.default = isAuth;
