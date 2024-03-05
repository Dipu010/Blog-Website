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
      token:{
        type:String
      },
      images: {
        type: String,
        required: true
    },
    Blogs:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs",
    }
})
module.exports = mongoose.model("User", UserSchema);