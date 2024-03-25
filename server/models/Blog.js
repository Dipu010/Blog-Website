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
    summary:{
        type:String,
        required:true
    },
    tags:{
        type:[{ label: String, value: String }]
    },
    description:{
        type: String,
        required:true
    },
    picture:{
        type: String,
    }
},
{timestamps:true})

export const  Blog = mongoose.model("Blog", blogSchema);
