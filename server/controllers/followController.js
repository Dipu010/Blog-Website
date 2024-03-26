import { Follow } from "../models/Follow.js";
import { Notification } from "../models/Notification.js";
import { User } from "../models/User.js";
import { apiResponse } from "../utils/apiResponse.js";

//this controller is imported in the Blog routes for now

export const FollowPerson = async (req, res) => {
  try {
    const { followingID } = req.body;
    const follower = req.data._id;

    const followedUser = await Follow.findOne({
      $and: [{ follower }, { following: followingID }],
    });
    if (followedUser) {
      await Follow.findByIdAndDelete(followedUser._id, { new: true });
      var data = { val: 0 };
      return res
        .status(200)
        .json(new apiResponse(200, { data }, "Unfollowed the user"));
    }

    var data = await Follow.create({
      follower: follower,
      following: followingID,
    });
    const FollowedUser = await User.findOne({ _id: followingID }).populate(
      "notifications"
    );
    
    const prevNotifications = FollowedUser.notifications;
    var notification;
    if (prevNotifications.length != 0) {
      let x = prevNotifications.length - 1;
      if ((prevNotifications[x].message).includes("following you")) {
        if((prevNotifications[x].message).includes( req.data.userName)){
         
          data = { ...data, val: 1 };
          return res
            .status(200)
            .json(new apiResponse(200, { data }, "Following the user"));
        }
        const newMessage =
          req.data.userName + "," + prevNotifications[x].message;
        notification = await Notification.findOneAndUpdate(
          { _id: prevNotifications[x]._id },
          { message: newMessage },
          {new:true}
        );
        data = { ...data, val: 1 };
        return res
          .status(200)
          .json(new apiResponse(200, { data }, "Following the user"));
      }
    }

    notification = await Notification.create({
      user: followingID,
      message: `${req.data.userName} is following you`,
    });

    var notify = await User.findOneAndUpdate(
      { _id: followingID },
      { $push: { notifications: notification._id } },
      { new: true }
    ).populate("notifications");
    data = { ...data, val: 1 };

    return res
      .status(200)
      .json(new apiResponse(200, { data}, "Following the user"));
  } catch (error) {
    return res.status(200).json({
      success: false,
      data: "",
      message: error.message,
    });
  }
};
