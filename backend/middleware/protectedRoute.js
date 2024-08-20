import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const protectedRoute=async(req,res,next)=>{
    try {
        
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"You are not logged in"})
        }

        const decoded=await jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({error:"unauthorized: Invalid Token"})
        }

        const user=await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(401).json({error:"User not found"})
        }

        req.user=user;
        next();

    } catch (error) {
        console.error(error);
        return res.status(401).json({error:error.message})
    }
}