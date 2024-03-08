//SignUp,Login,Logout,ForgetPassword,ResetPassword
import {User} from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const Register = async (req, res) => {
  try {
    var { fullName, email, password ,accountType} = req.body;
    const check = await User.findOne({email});
    if (check) {
      throw new Error( "User already exist" );
      };
     
      const hashValue = await bcrypt.hash(password, 10);
      const data = await User.create({
      fullName,
        email,
        password: hashValue,
        accountType,
        profilePicture:`https://api.dicebear.com/5.x/initials/svg?seed=${fullName.charAt(0)}${fullName.split(" ")[1]}`
      });
      console.log(data);
      res.status(200).json({
        success: true,
        data: data,
        message: "Data Send success",
      });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      data: "can not find",
      message: error.message,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Enter all field");
    }

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      throw new Error("User Not Found");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Password Invalid");
    }

    const refreshPayload = {
      id: user._id,
      name: user.name,
      user:user.user
    };
    const accessPayload = {
      id: user._id,
      email:user.email,
      name: user.name,
      user:user.user
    }
    const secretKey = process.env.JWT_SECRET_CODE;
    const refreshToken = jwt.sign(refreshPayload, secretKey, {expiresIn: "30d"});
    const accessToken = jwt.sign(accessPayload, secretKey , {expiresIn: "2h"});
    const data = await User.findByIdAndUpdate(user._id,{token:refreshToken},{new:true});
    res
      .cookie("refreshToken", refreshToken , { httpOnly: true, maxAge: 10000000000000 })
      .cookie("accessToken",accessToken,{ httpOnly: true, maxAge: 100000000 })
      .status(200)
      .json({
        success: true,
        data:data
      });
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
};
export const forgetPassword=async(req,res)=>{
  // Sending the mail.
  const target = req.body.email;
  const data = await User.findOne({email:target});
  console.log(data);
  if(!data) 
  {
    res.status(404).json({
        success:false,
        data:"User maria ai age",
        message:"not success"
    })
    return;
  } 
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "spdboys10@gmail.com",
      pass: "tmfv wafx ppcj gefu",
    },
  });
  const payload = {
    
    email:target
  }
  const secretKey = process.env.JWT_SECRET_CODE;
  // send mail with defined transport object
  try {
    const info = await transporter.sendMail({
      from: '"SPD owner 👻" <maddison53@ethereal.email>', // sender address
      to: target, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "click the below link", // plain text body
      html: "<div><p>click the below link<p><br/><Link>http://localhost:5173/newpassword</Link></div>", // html body
    });
    const token = jwt.sign(payload, secretKey, {expiresIn: "1h"});
    res
        .cookie("token",token,{ httpOnly: true, maxAge: 10000000000000 })
        .status(200)
        .json({
            success:true,
            message:"email Send"
        })

  } catch (error) {
    res.status(500).json({
        success:false,
        data:"108 bar",
        message:"not success"
    })
  }
}
export const ChangePassword=async(req,res)=>{
    try {
        const {Password,ConfirmPassword}=req.body;
        console.log({Password,ConfirmPassword})
    if(Password!==ConfirmPassword){
        return res.status(401).json({
            success:false,
            message:"password not match"
        })
        
    }
  // hash the password and save in the db,
   const hashPassword= await bcrypt.hash(Password,10);
   const data=await User.findOneAndUpdate({email:req.data.email},{password:hashPassword},{new:true});
   console.log(data);
   return res.status(200).json({
    success:true,
    message:"Password Saved Successfully"
   })
     } catch (error) {
         console.log(error);
         return res.status(500).json({
            success:false,
            message:"Password dont save"
         })
    }
}