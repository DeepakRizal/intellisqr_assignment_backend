import express from "express";
import { login, signup } from "../controllers/userController";

const router = express.Router();

//route to signup the user
router.post("/signup", signup);

//router to login the user
router.post("/login", login);

export default router;
