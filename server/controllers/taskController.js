import Task from "../models/taskModel.js";

export const createTasks= async (req,res)=>{
    try{
        const {title,description,priority,dueDate,completed,team}=req.body;
        const task = new Task({
            title,description,priority,dueDate,completed:completed==='Yes' || completed===true,
            owner:req.user.id,
            team
        });
        const save= await task.save();
        res.status(200).json({success:true,task:save}) 
    }
    catch(e){
        res.status(400).json({success:false,message:e.message})
    }
}

export const getTasks = async (req,res)=>{
    try{
        const tasks= await Task.find({owner:req.user.id}).sort({createdAt:-1})
        res.json({success:true,tasks})
    }
    catch(error){
        res.status(400).json({success:false,message:error.message})

    }
}

export const getTaskbyId = async(req,res)=>{
    try{
        const tasksById= await Task.findOne({_id:req.params.id,owner:req.user.id});
        if(!tasksById){
            res.status(404).json({success:false,message:"Task not found"});
            
        }
        res.json ({success:true,tasksById})
    }
    catch(e){
        res.status(400).json({success:false,message:e.message})

    }
}

export const updateTask = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.completed !== undefined) {
      data.completed = data.completed === 'Yes' || data.completed === true;
    }

    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      data,
      { new: true, runValidators: true }
    );
    if(!updated){
        res.status(404).json({success:false,message:"task not found"})
    }
    res.json({success:true,task:updated})

  } catch (err) {
     res.status(400).json({success:false,message:err.message})
  }
}

export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id });

    if (!deleted) return res.status(404).json({ success: false, message: "Task not found " });
    res.json({ success: true, message: "Task deleted" });
  }
  catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}