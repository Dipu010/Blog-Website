//SignUp,Login,Logout,ForgetPassword,ResetPassword
import {User} from "../models/User.js";
import {Blog} from "../models/Blog.js";
import { Follow } from "../models/Follow.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
dotenv.config();


const generateAccessandRefreshTokens=async(userId)=>{
  try{
      
      const user=await User.findById(userId)
      
      const accessToken= user.generateAccessToken()
      
      const refreshToken=user.generateRefreshToken()

      user.refreshToken=refreshToken
      await user.save({validateBeforeSave:false})

      return {accessToken,refreshToken}

      
  }
  catch(error){
      throw new apiError(500,"Something went wrong while creating tokens")
  }
}

 const registerUser = asyncHandler(async (req, res) => {
    var { firstName,lastName, email,userName, password ,accountType} = req.body;
    // console.log({ firstName,lastName, email,userName, password ,accountType})
    const check = await User.findOne({email});
    if (check) {
      throw new apiError(401,"User Already Exists with the given email")
      };
     
      
      const data = await User.create({
        firstName,
        lastName,
        email,
        userName,
        password,
        accountType,
         profilePicture:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
      });
      return res.status(200).json(new apiResponse(200,{data},"User Registered Successfully"));
  });

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new apiError(404,"All fields are Required");
    }

    const existedUser= await User.findOne({ email });
    // console.log(existedUser);
    if (!existedUser) {
      throw new apiError(404,"User Not Registered");
    }

    const isPasswordCorrect1=await existedUser.isPasswordCorrect(password)
    if(!isPasswordCorrect1){
        throw new apiError(401,"Wrong Password")
    }


   
    const {accessToken,refreshToken}=await generateAccessandRefreshTokens(existedUser._id)

    const data = await User.findByIdAndUpdate(existedUser._id,{token:refreshToken},{new:true});

    const options={
      httpOnly: true,
      secure: true
  }


    return res.cookie("refreshToken", refreshToken ,options)
      .cookie("accessToken",accessToken,options)
      .status(200)
      .json(new apiResponse(200,{data:data},`${data.userName} logged in successfully`));
});


export const forgetPassword=async(req,res)=>{
  // Sending the mail.
  const target = req.body.email;
  const data = await User.findOne({email:target});
  // console.log(data);
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
        // console.log({Password,ConfirmPassword})
    if(Password!==ConfirmPassword){
        return res.status(401).json({
            success:false,
            message:"password not match"
        })
        
    }
  // hash the password and save in the db,
   const hashPassword= await bcrypt.hash(Password,10);
   const data=await User.findOneAndUpdate({email:req.data.email},{password:hashPassword},{new:true});
  //  console.log(data);
   return res.status(200).json({
    success:true,
    message:"Password Saved Successfully"
   })
     } catch (error) {
        //  console.log(error);
         return res.status(500).json({
            success:false,
            message:"Password dont save"
         })
    }
}

const showProfile=asyncHandler(async(req,res)=>{

    console.log("Params:-",req.params.id)
    const{userName}=req.body
    const userData=await User.findOne({userName:userName})
    const follower = req.data._id;
    const following = userData._id;
    console.log("follower="+follower);
    console.log("following="+following);

    const isFollowing = await Follow.findOne({follower,following});
    console.log(isFollowing);
    var followData;
    if(isFollowing){
      followData={isFollowing:true};
    }
    else{
      followData={isFollowing:false};
    }
    
    if(!userData)
      throw new apiError(404,"User not found")

    const userPosts=await Blog.find({owner:userData._id}).sort({createdAt:-1})
    // console.log(userPosts)

    res.status(201).json(new apiResponse(200,{userData,userPosts,followData},"Everything fetched"))



})

const logoutUser=asyncHandler(async(req,res)=>{
    const userId=req.data._id
   
    await User.findByIdAndUpdate(userId,
      {
          refreshToken:""
      },
      {
          new:true
      }
  )
      
      
     
      

      const options={
          httpOnly: true,
          secure: true
      }
     
      return res
      .status(200)
      .clearCookie("accessToken",options)
      .clearCookie("refreshToken",options)
      .json(new apiResponse(200,{},`User ${userId} Logged out Succesfully `))
      }
  )

  const authenticateUser=asyncHandler(async(req,res)=>{

            const {accessToken,refreshToken}=req.cookies

            if(!accessToken){
                if(!refreshToken){
                   throw new apiError(404,"No Access and Refresh Token.Plz Login")
                }
                
                const decode=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
                const newTokens=await generateAccessandRefreshTokens(decode._id)
                await User.findByIdAndUpdate(decode._id,{refreshToken:newTokens.refreshToken},{new:true})

                const options={
                  httpOnly: true,
                  secure: true
              }

                return res
                .cookie("accessToken",newTokens.accessToken,options)
                .cookie("refreshToken",newTokens.refreshToken,options).status(201)
                .json(new apiResponse(201,{newTokens},"New access and refresh tokens created succesfully"))

            }

            return res.status(200).json(new apiResponse(200,{},"Access Token is present"))
  })




export {registerUser,loginUser,showProfile,logoutUser,authenticateUser}