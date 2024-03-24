import mongoose from "mongoose";
const notificationSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message:{
        type:String,
        required: true,
    }
});
export const Notification = mongoose.model("Notification",notificationSchema);