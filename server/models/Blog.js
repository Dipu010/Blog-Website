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
        default: Date.now()
    },
    updatedAt:{
        type:Date,
        default: Date.now()
    }
})

export const  Blog = mongoose.model("Blog", blogSchema);
