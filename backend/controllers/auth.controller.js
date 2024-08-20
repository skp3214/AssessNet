import bcrypt from "bcryptjs/dist/bcrypt.js";
import User from "../models/user.model.js";
import { generateTokenAndCookie } from "../lib/utils/generateToken.js";

export const signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({error:"Invalid email format"});
        }

        const existingEmail=await User.findOne({email});

        if(existingEmail){
            return res.status(400).json({error:"Email already exists"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password, salt);

        const user=new User({name,email,password:hashedPassword});

        if(user){
            generateTokenAndCookie(user._id,res);
            await user.save();
            return res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email
            });
        }
        else{
            return res.status(500).json({error:"Internal Server Error"});
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({error:err.message});
    }
}
export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        
        const isPasswordCorrect=await bcrypt.compare(password,user?.password||"");
        
        if(!isPasswordCorrect||!user){
            return res.status(400).json({error:"Invalid email or password"});
        }
        
        generateTokenAndCookie(user._id,res);
        
        return res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    } 
    catch (err) {
        console.log(err.message);
        return res.status(500).json({error:err.message});
    }
}
export const logout=async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        return res.status(200).json({message:"Logged out successfully"});
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({error:err.message});
    }
}

export const getMe=async(req,res)=>{
    try {
        const user=await User.findById(req.user._id).select("-password");
        return res.status(200).json(user);
    } catch (error) {
        console.log(err.message);
        return res.status(500).json({error:err.message});
    }
}