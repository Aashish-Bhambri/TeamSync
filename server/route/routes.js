import { Router } from "express";
import { loginController, registerController, searchUser } from "../controllers/userController.js";
import authMiddleware from "../controllers/auth/auth.js";

const router = Router();

// Auth routes
router.post("/user/register",registerController)
router.post("/user/login",loginController)
router.get("/user/search", authMiddleware, searchUser)

export default router;