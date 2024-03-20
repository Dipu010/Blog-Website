import { Follow } from "../models/Follow.js";
import { apiResponse } from "../utils/apiResponse.js";

//this controller is imported in the Blog routes for now

export const FollowPerson = async (req, res) => {
  try {
    const { followingID } = req.body;
    const follower = req.data._id;

    const followedUser= await Follow.findOne({$and:[{follower},{following:followingID}]})
    console.log(followedUser)

    if(followedUser){
      await Follow.findByIdAndDelete(followedUser._id,{new:true})
      var data={val:0}
      return res.status(200).json(new apiResponse(200,{data},"Unfollowed the user"))
    }


    var data = await Follow.create({
      follower: follower,
      following: followingID,
    });
    data={...data,val:1}

    return res.status(200).json(new apiResponse(200,{data},"Following the user"))
  } catch (error) {
    return res.status(200).json({
        success: false,
        data: "",
        message: error.message
      });
  }
};
