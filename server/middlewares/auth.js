import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { apiError } from "../utils/apiError.js";

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

export default auth;
