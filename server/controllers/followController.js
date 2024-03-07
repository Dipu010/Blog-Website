import { Follow } from "../models/Follow.js";

//this controller is imported in the Blog routes for now

export const FollowPerson = async (req, res) => {
  try {
    const { followingID } = req.body;
    console.log(followingID);
    const follower = req.data.id;

    const data = await Follow.create({
      follower: follower,
      following: followingID,
    });

    return res.status(200).json({
      success: true,
      data: data,
      message: "your are following this user",
    });
  } catch (error) {
    return res.status(200).json({
        success: false,
        data: "",
        message: error.message
      });
  }
};
