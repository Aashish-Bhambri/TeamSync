import { Router } from "express";
import authMiddleware from "../controllers/auth/auth.js";
import { createProject, getProjects } from "../controllers/projectController.js";

const projectRoutes = Router();

projectRoutes.post("/create", authMiddleware, createProject);
projectRoutes.get("/all", authMiddleware, getProjects);

export default projectRoutes;
