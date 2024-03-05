import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    blog:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required:true
    }
})

module.exports = mongoose.model("Blog",blogSchema);