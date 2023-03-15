import { body } from "express-validator";

import { deleteUser, getAllUsers, getUserProfile, login, refreshToken, signup } from "../controllers/auth"
import { Router } from "express";
import User from "../models/User";
import isAuth from "../middlewares/isAuth";
const router=Router()

router.post(
    "/signup",
    [
        body("email")
            .isEmail()
            .withMessage("Please enter a valid Email!")
            .custom(async (value) => {
                const user = await User.findOne({ email: value });
                if (user) {
                    return Promise.reject("Email address already exist!");
                }
            }),
        body("name").trim().notEmpty().withMessage("Name field must not be empty!"),
        body("password")
            .trim()
            .matches(
                "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
            )
            .withMessage(
                `Password must contain atleast 8 characters. There must be atleast one uppercase letter,one lowercase letter, one digit and one special character.`
            ),
    ],
    signup
);

router.post(
    "/login",
    body("email").isEmail().withMessage("Please enter a valid Email!"),
    login
);

router.delete("/deleteUser",isAuth,deleteUser)

router.get("/newtoken",isAuth,refreshToken)

router.get("/user",isAuth,getUserProfile)

router.get("/users",isAuth, getAllUsers);


export default router