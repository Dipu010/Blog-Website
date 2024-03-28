import mongoose from "mongoose";
const notificationSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message:{
        type:String,
        required: true,
    },
    view:{
        type:Number,
        default:0
    }
},{timestamps:true});
export const Notification = mongoose.model("Notification",notificationSchema);