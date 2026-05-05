import mongoose from "mongoose";



export const connection = async()=>{
    const uri = process.env.MONGO_URI || 'mongodb+srv://Aashish:admin0159@cluster0.kdhkj2y.mongodb.net/';
    await mongoose.connect(uri)
    .then(()=>console.log("Db connected"))
    .catch((err)=>console.error("Db connection error:", err));
}