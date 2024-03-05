import mongoose from "mongoose";

const blogSchema = mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    picture:{
        type: String,
    },
    createdAt:{
        type: Date,
        default:new Date.now()
    },
    updatedAt:{
        type:Date,
        default:new Date.now()
    }
})

module.exports = mongoose.model("Blog", blogSchema);
