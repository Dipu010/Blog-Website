import mongoose, { Schema } from "mongoose";
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"

const UserSchema=mongoose.Schema({
      firstName: {
        type: String,
       
      },
      googleId:{
        type:String
      },
      lastName: {
        type: String,
        // required: true,
      },
      displayName:{
        type:String
      },
      userName:{
        type:String,
        // required:true,
        index:true,
        unique:true,
        lowercase:true
      },
      email: {
        type: String,
        required: true,
        unique: [true, "user already exists"],
      },
      password: {
        type: String,
      },
      accountType:{
        type:String,
        enum:["user","admin"],
        default:'user',
        lowercase:true,
        required:true
      },
      refreshToken:{
        type:String
      },
      profilePicture: {
        type: String
      },
      notifications:[
         {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Notification",
         }
      ]

   
},{timestamps:true})


UserSchema.pre("save",async function(next){
  if(this.isModified("password"))
      this.password=await bcrypt.hash(this.password,10)
  next()
})


UserSchema.methods.isPasswordCorrect=async function(password){
  return await bcrypt.compare(password,this.password)
}

UserSchema.methods.generateAccessToken=function(){
  return jwt.sign(
      {
          _id:this._id,
          userName:this.userName,
          email:this.email,
          firstName:this.firstName,
          accountType:this.accountType
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn:process.env.ACCESS_TOKEN_EXPIRY
      }
  )
  
}

UserSchema.methods.generateRefreshToken=function(){
  return jwt.sign(
      {
          _id:this._id,
          accountType:this.accountType
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn:process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}

export const User=mongoose.model("User",UserSchema);