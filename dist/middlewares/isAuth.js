"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const apiError_1 = require("../errors/apiError");
dotenv_1.default.config();
const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const err = new apiError_1.ApiError("Not Authenticated", 401);
        next(err);
    }
    const token = authHeader.split(" ")[1];
    try {
        var decodedToken = jsonwebtoken_1.default.verify(token, process.env.JSONSECRET);
        if (!decodedToken) {
            const err = new apiError_1.ApiError("Not Authenticated", 401);
            next(err);
        }
        if (typeof decodedToken !== 'string' && 'userId' in decodedToken)
            req.userId = decodedToken.userId;
    }
    catch (error) {
        const err = new apiError_1.ApiError(error.message, 500);
        next(err);
    }
    next();
};
exports.default = isAuth;
