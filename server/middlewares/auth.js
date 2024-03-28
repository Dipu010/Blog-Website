import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";

dotenv.config();

 const auth =  async(req,res,next)=>{
    const token =  req.cookies.accessToken 
    console.log(req.cookies)
    if(!token){
       
        return res.status(500)
      
    };

    try{
        const key=process.env.ACCESS_TOKEN_SECRET;
        const decode = jwt.verify(token,key);
        console.log(decode);
        req.data = decode;
        return next();
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"invalid token"
        })
    }

}
 const isAdmin=async(req,res,next)=>{
  try {
    if(req.data.accountType!=='admin'){
        return res.status(401).json(new apiResponse(401,{},'This is a protected route for admin'))
    }
  } catch (error) {
   return res.status(500).json(new apiResponse(500,{},'Admin not defined'))
  }
    next();
}
 const isUser=async(req,res,next)=>{
    try {
        if(req.data.accountType!=='user'){
            return res.status(401).json(new apiResponse(401,{},'This is a protected route for user'))
        }
      } catch (error) {
       return res.status(500).json(new apiResponse(500,{},'User not defined'))
      }
        next();
}
 

export {auth,isAdmin,isUser};

