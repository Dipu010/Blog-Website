import { Follow } from "../models/Follow.js";
import { Notification } from "../models/Notification.js";
import { User } from "../models/User.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
//this controller is imported in the Blog routes for now

export const FollowPerson = asyncHandler(async (req, res) => {

    const { followingID } = req.body;
    const follower = req.data._id;
    
    if(followingID===follower){
      throw new apiError(404,"Follower and follwing id cannot be same")
    }

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
      if (
        prevNotifications[x].message.includes("following you") &&
        prevNotifications[x].view === 0
      ) {
        if (prevNotifications[x].message.includes(req.data.userName)) {
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
          { new: true }
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

    if (prevNotifications.length < 10) {
      const notify = await User.findOneAndUpdate(
        { _id: followingID },
        { $push: { notifications: notification._id } },
        { new: true }
      ).populate("notifications");
      data = { ...data, val: 1 };
      return res
        .status(200)
        .json(new apiResponse(200, { data }, "Following the user"));
    }

    const notify = await User.findOneAndUpdate(
      { _id: followingID },
      [
        { $pop: { notifications: -1 } }, // Pop the first element
        { $push: { notifications: notification._id } },
      ],
      { new: true }
    ).populate("notifications");
    data = { ...data, val: 1 };
    return res
      .status(200)
      .json(new apiResponse(200, { data }, "Following the user"))
})
  

export const GetNotifictionCount = asyncHandler(async (req, res) => {
  const userName = req.body.userName;
  const userData = await User.findOne({ userName }).populate("notifications");
  var notificationCount = 0;
  for (let i = 0; i < userData.notifications.length; i++) {
    if (userData.notifications[i].view === 0) {
      notificationCount++;
    }
  }
  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { notificationCount },
        "unseen notification count fetched"
      )
    );
});

export const GetNotification = asyncHandler(async (req, res) => {
  const userName = req.body.userName;
  const userData = await User.findOne({ userName })
    .sort({
      updatedAt: -1,
    })
    .populate("notifications");
  const notifications = userData.notifications;
  return res
    .status(200)
    .json(new apiResponse(200, { notifications }, "all notifications fetched"));
});

export const ViewNotification = asyncHandler(async (req, res) => {
  const _id = req.body;
  const seen = await Notification.findOneAndUpdate({ _id }, { view: 1 });
  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { seen },
        "you have successfully viewed this message"
      )
    );
});
