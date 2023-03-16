import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { ApiError } from "../models/ApiError";
export const signup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            throw errors.array().reduce((f, r) => f + r.msg + " ", "");
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email,
            password: hashedPassword,
            name
        });
        const result = await user.save();
        const token = jwt.sign({ email, userId: result._id.toString() }, process.env.JSONSECRET, { expiresIn: '1h' });
        res.status(201).json({ token, userId: result._id });
    }
    catch (error) {
        const err = new ApiError("Validation Error", 401);
        if (typeof error === "string")
            err.update(error);
        else if (error instanceof Error)
            err.update(error.message);
        next(err);
    }
};
export const login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const errors = validationResult(req).array();
        if (errors.length > 0)
            throw errors[0].msg;
        const user = await User.findOne({ email });
        if (!user)
            next(new ApiError("A user with this email could not be found.", 404));
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual)
            next(new ApiError("Incorrect Password.", 401));
        const token = jwt.sign({ email, userId: user._id.toString() }, process.env.JSONSECRET, { expiresIn: '1h' });
        res.status(200).json({ token, userId: user._id.toString() });
    }
    catch (error) {
        const err = new ApiError("Could Not Login. Please try again!", 401);
        if (typeof error === "string")
            err.update(error);
        else if (error instanceof Error)
            err.update(error.message);
        next(err);
    }
};
export const getUserProfile = async (req, res, next) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId, { password: 0, __v: 0 });
        if (!user)
            throw user;
        res.status(200).json({ user });
    }
    catch (error) {
        const err = new ApiError("Could Not find User!", 404);
        next(err);
    }
};
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0, __v: 0 });
        if (!users)
            throw users;
        res.status(200).json({ users });
    }
    catch (error) {
        const err = new ApiError("Could Not find Users!", 404);
        next(err);
    }
};
export const refreshToken = async (req, res, next) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId);
        if (!user)
            throw user;
        const token = jwt.sign({ user: user.email, userId: user._id.toString() }, process.env.JSONSECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (error) {
        const err = new ApiError("Could Not find User!", 404);
        next(err);
    }
};
export const deleteUser = async (req, res, next) => {
    const userId = req.userId;
    try {
        await User.findByIdAndRemove(userId);
        res.status(200).json({ message: "User Deleted." });
    }
    catch (error) {
        const err = new ApiError("User could not be deleted!", 404);
        next(err);
    }
};
