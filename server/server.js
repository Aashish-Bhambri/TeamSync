import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connection } from './db/db.js';
import router from './route/routes.js';
import taskroutes from './route/taskRoutes.js';
import teamRoutes from './route/teamRoutes.js';
import projectRoutes from './route/projectRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.use("/api",router);
app.use("/api/tasks",taskroutes);
app.use("/api/teams", teamRoutes);
app.use("/api/projects", projectRoutes);
connection();

app.get('/',(req,res)=>{
    res.send('working')
})

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, ()=>{
        console.log(`Server started at ${port} `)
    })
}

export default app;