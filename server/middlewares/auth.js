import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth =  async(req,res,next)=>{
    const token = req.body.token || req.cookies.token
    console.log(token);
    if(!token){
        return  res.status(401).json({
        success:false,
        message:"user not loged in"
       });
      
    };

    try{
        const key=process.env.JWT_SECRET_CODE;
        console.log(key);
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

export default auth
