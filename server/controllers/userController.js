import dotenv from 'dotenv';
import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs"
import validator from "validator";
import jwt from 'jsonwebtoken'

dotenv.config();
const JWT_SECRET= process.env.JWT_SECRET;
const TOKEN_EXPIRES = '24h';

const createToken =  (userId)=>jwt.sign({id:userId},JWT_SECRET,{expiresIn:TOKEN_EXPIRES})


export async function registerController (req,res){
    const{username,email,password}=req.body;
    
    if(!username || !email || !password){
        return res.status(400).json({success:false,message:"All fields required"});
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({success:false,message:"Enter valid email"});
    }
    try {
       if(await User.findOne({email})){
        return res.status(409).json({success:false,message:"Email already exists!"});
       }
       if(await User.findOne({username})){
        return res.status(409).json({success:false,message:"Username already exists!"});
       }
       const hashed = await bcryptjs.hash(password,10)
       const user = await User.create({username,email,password:hashed})
       const token = createToken(user._id)

       res.status(200).json({success:true,token,user:{id:user._id, username:user.username, email:user.email}})
    }
    catch(error){
        console.error("Registration error:", error)
        res.status(500).json({success:false,message:"Registration failed", error: error.message})
    }
    
}

export async function loginController(req,res){
    const{email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({success:false,message:"All fields required"});
    }
    try {
        const user = await User.findOne({email});
       if(!user){
        return res.status(404).json({success:false,message:"Invalid credentials"});
       }
       const match = await bcryptjs.compare(password,user.password);
       if(!match){
        return res.status(401).json({success:false,message:"Invalid Password"})
       } 

       const token = createToken(user._id)
       res.json({success:true,token,user:{id:user._id, username:user.username,email:user.email}})
    }
    catch(error){
        console.log(error)
        res.status(500).json("Internal Error")
    }
}

export async function searchUser(req, res) {
    try {
        const { email } = req.query;
        const user = await User.findOne({ email }).select("username email _id");
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}