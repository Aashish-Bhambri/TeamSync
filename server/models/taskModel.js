import mongoose from "mongoose";

const taskSchema= new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String
    },
    priority:{
        type:String,
        enum:['low','medium','high']
    },
    dueDate:{
        type:Date
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,ref:'User',required:true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Team'
    },
    completed:{
        type:Boolean,
        default:false
    },
    createAt:{
        type:Date,
        default:Date.now
    }
});

const Task = mongoose.models.Task || mongoose.model("Task",taskSchema);

export default Task; 