import { body } from "express-validator";

import { deleteUser, getAllUsers, getUser, login, refreshToken, signup } from "../controllers/auth"
import { Router } from "express";
const router=Router()

router.post("/signup",signup)

router.post("/login",login)

router.delete("/deleteUser",deleteUser)

router.patch("/newtoken",refreshToken)

router.get("/user",getUser)

router.get("/users", getAllUsers);


export default router