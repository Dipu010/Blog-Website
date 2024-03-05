import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
    val:{
        type:Number
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

module.exports = mongoose.model("Like",likeSchema);