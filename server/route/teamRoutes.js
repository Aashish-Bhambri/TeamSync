import { Router } from "express";
import authMiddleware from "../controllers/auth/auth.js";
import { createTeam, getTeams, addMember } from "../controllers/teamController.js";

const teamRoutes = Router();

teamRoutes.post("/create", authMiddleware, createTeam);
teamRoutes.get("/all", authMiddleware, getTeams);
teamRoutes.post("/add-member", authMiddleware, addMember);

export default teamRoutes;
