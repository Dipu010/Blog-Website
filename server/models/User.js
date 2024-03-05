import mongoose, { Schema } from "mongoose";
const UserSchema=mongoose.Schema({
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
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
   
})
module.exports = mongoose.model("User", UserSchema);