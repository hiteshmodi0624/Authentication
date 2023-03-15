"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.refreshToken = exports.getAllUsers = exports.getUserProfile = exports.login = exports.signup = void 0;
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const ApiError_1 = require("../models/ApiError");
const signup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            throw errors.array().reduce((f, r) => f + r.msg + " ", "");
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        const user = new User_1.default({
            email,
            password: hashedPassword,
            name
        });
        const result = await user.save();
        const token = jsonwebtoken_1.default.sign({ email, userId: result._id.toString() }, process.env.JSONSECRET, { expiresIn: '1h' });
        res.status(201).json({ token, userId: result._id });
    }
    catch (error) {
        const err = new ApiError_1.ApiError("Validation Error", 401);
        if (typeof error === "string")
            err.update(error);
        else if (error instanceof Error)
            err.update(error.message);
        next(err);
    }
};
exports.signup = signup;
const login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const errors = (0, express_validator_1.validationResult)(req).array();
        if (errors.length > 0)
            throw errors[0].msg;
        const user = await User_1.default.findOne({ email });
        if (!user)
            next(new ApiError_1.ApiError("A user with this email could not be found.", 404));
        const isEqual = await bcrypt_1.default.compare(password, user.password);
        if (!isEqual)
            next(new ApiError_1.ApiError("Incorrect Password.", 401));
        const token = jsonwebtoken_1.default.sign({ email, userId: user._id.toString() }, process.env.JSONSECRET, { expiresIn: '1h' });
        res.status(200).json({ token, userId: user._id.toString() });
    }
    catch (error) {
        const err = new ApiError_1.ApiError("Could Not Login. Please try again!", 401);
        if (typeof error === "string")
            err.update(error);
        else if (error instanceof Error)
            err.update(error.message);
        next(err);
    }
};
exports.login = login;
const getUserProfile = async (req, res, next) => {
    const userId = req.userId;
    try {
        const user = await User_1.default.findById(userId, { password: 0, __v: 0 });
        if (!user)
            throw user;
        res.status(200).json({ user });
    }
    catch (error) {
        const err = new ApiError_1.ApiError("Could Not find User!", 404);
        next(err);
    }
};
exports.getUserProfile = getUserProfile;
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User_1.default.find({}, { password: 0, __v: 0 });
        if (!users)
            throw users;
        res.status(200).json({ users });
    }
    catch (error) {
        const err = new ApiError_1.ApiError("Could Not find Users!", 404);
        next(err);
    }
};
exports.getAllUsers = getAllUsers;
const refreshToken = async (req, res, next) => {
    const userId = req.userId;
    try {
        const user = await User_1.default.findById(userId);
        if (!user)
            throw user;
        const token = jsonwebtoken_1.default.sign({ user: user.email, userId: user._id.toString() }, process.env.JSONSECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (error) {
        const err = new ApiError_1.ApiError("Could Not find User!", 404);
        next(err);
    }
};
exports.refreshToken = refreshToken;
const deleteUser = async (req, res, next) => {
    const userId = req.userId;
    try {
        await User_1.default.findByIdAndRemove(userId);
        res.status(200).json({ message: "User Deleted." });
    }
    catch (error) {
        const err = new ApiError_1.ApiError("User could not be deleted!", 404);
        next(err);
    }
};
exports.deleteUser = deleteUser;
