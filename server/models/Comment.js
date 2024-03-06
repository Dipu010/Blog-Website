import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
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

export const Comment = mongoose.model("Comment",commentSchema);