import mongoose, { Schema } from "mongoose";
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"

const UserSchema=mongoose.Schema({
      firstName: {
        type: String,
        required: true,
      },
     lastName: {
        type: String,
        required: true,
      },
      userName:{
        type:String,
        required:true,
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
        required: true,
      },
      accountType:{
        type:String,
        enum:["user","admin"],
        lowercase:true
      },
      refreshToken:{
        type:String
      },
      profilePicture: {
        type: String
    }
   
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
          username:this.username,
          email:this.email,
          firstName:this.firstName
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
          _id:this._id
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn:process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}

export const User=mongoose.model("User",UserSchema);