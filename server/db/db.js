import mongoose from "mongoose";



export const connection = async()=>{
    await mongoose.connect('mongodb+srv://Aashish:admin0159@cluster0.kdhkj2y.mongodb.net/')
    .then(()=>console.log("Db connected"))
}