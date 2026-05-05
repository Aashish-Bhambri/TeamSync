import { Router } from "express";
import authMiddleware from "../controllers/auth/auth.js";
import { createTasks, deleteTask, getTaskbyId, getTasks, updateTask } from "../controllers/taskController.js";

 const taskroutes=Router();

taskroutes.route('/gp')
    .get(authMiddleware,getTasks)
    .post(authMiddleware,createTasks)

taskroutes.route('/:id/gp')
    .get(authMiddleware,getTaskbyId)
    .put(authMiddleware,updateTask)
    .delete(authMiddleware,deleteTask)

export default taskroutes;