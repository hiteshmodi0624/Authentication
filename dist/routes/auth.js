"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const router = (0, express_1.Router)();
router.post("/signup", [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Please enter a valid Email!")
        .custom(async (value) => {
        const user = await User_1.default.findOne({ email: value });
        if (user) {
            return Promise.reject("Email address already exist!");
        }
    }),
    (0, express_validator_1.body)("name").trim().notEmpty().withMessage("Name field must not be empty!"),
    (0, express_validator_1.body)("password")
        .trim()
        .matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
        .withMessage(`Password must contain atleast 8 characters. There must be atleast one uppercase letter,one lowercase letter, one digit and one special character.`),
], auth_1.signup);
router.post("/login", (0, express_validator_1.body)("email").isEmail().withMessage("Please enter a valid Email!"), auth_1.login);
router.delete("/deleteUser", isAuth_1.default, auth_1.deleteUser);
router.get("/newtoken", isAuth_1.default, auth_1.refreshToken);
router.get("/user", isAuth_1.default, auth_1.getUserProfile);
router.get("/users", auth_1.getAllUsers);
exports.default = router;
