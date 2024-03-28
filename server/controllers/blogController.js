import { Blog } from "../models/Blog.js";
import { Like } from "../models/Like.js";
import {Notification} from "../models/Notification.js"
import { Comment } from "../models/Comment.js";
import { cloudinary } from "../utils/cloudinary.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { User } from "../models/User.js";

export const CreateBlog = asyncHandler(async (req, res) => {
  const { title, description, image, summary, tags } = req.body;
  var picture;
  if (image) {
    const uploadedImage = await cloudinary.uploader.upload(
      image,
      {
        upload_preset: "unsigned_preset",
        allowed_formats: [
          "png",
          "jpg",
          "jpeg",
          "avif",
          "svg",
          "ico",
          "jfif",
          "webp",
        ],
      },
      function (error, response) {
        if (error) {
          throw new apiError(400, "something wrong with image link");
        }
      }
    );
    picture = uploadedImage.secure_url;
  } else picture = "";
  const user = req.data._id;

  if (!description || !title || !summary) {
    throw new apiError(404, "All fields are Required");
  }
  const data = await Blog.create({
    title,
    description,
    picture,
    owner: user,
    summary,
    tags,
  });
  if (!data) throw new apiError(500, "something went wrong!! please try again");

  const notification = await Notification.create({user:user,message:`${title} blog is posted successfully`});
  const notify = await User.findOneAndUpdate(
    { _id: user },
    { $push: { notifications: notification._id } },
    { new: true }
  ).populate("notifications");

  return res
    .status(200)
    .json(new apiResponse(200, { data }, "Blog posted Successfully"));
});

export const UpdateBlog = async (req, res) => {
  try {
    const { title, description, picture, id } = req.body;
    if (!description || !title) {
      return res.status(404).json({
        status: false,
        data: "",
        message: "please fill all input fields",
      });
    }
    const data = await Blog.findByIdAndUpdate(
      { _id: id },
      { title, description, picture },
      { new: true }
    );
    if (!data) throw new Error("Error has occured please try again");
    return res.status(200).json({
      status: true,
      data: data,
      message: "your blog is updated successfully",
    });
  } catch (error) {
    return res.status(404).json({
      status: false,
      data: "",
      message: error.message,
    });
  }
};

export const LikeBlog = asyncHandler(async (req, res) => {
  const { val, id } = req.body; //Here Id id blogID
  const user = req.data._id;
  const exist = await Like.findOne({ user: user, blog: id });
  if (exist) {
    if (val == 1 && exist.val == 1) {
      const data = await Like.findOneAndDelete({ _id: exist._id });
      return res
        .status(200)
        .json(new apiResponse(200, { data }, "Your like is removed"));
    } else if (val == 1 && exist.val == -1) {
      const data = await Like.findByIdAndUpdate({ _id: exist._id }, { val: 1 });
      return res
        .status(200)
        .json(new apiResponse(200, { data }, "Blog is Liked"));
    } else if (val == -1 && exist.val == 1) {
      const data = await Like.findByIdAndUpdate(
        { _id: exist._id },
        { val: -1 }
      );
      return res
        .status(200)
        .json(new apiResponse(200, { data }, "Blog is disliked"));
    } else if (val == -1 && exist.val == -1) {
      const data = await Like.findOneAndDelete({ _id: exist._id });
      return res
        .status(200)
        .json(new apiResponse(200, { data }, "Your dislike is removed"));
    }
  }
  const data = await Like.create({ val: val, user: user, blog: id });
  return res
    .status(200)
    .json(new apiResponse(200, { data }, "Blog is Liked/disliked"));
});

export const CommentBlog = asyncHandler(async (req, res) => {
  const { description, id } = req.body; //Here Id id blogId
  const user = req.data._id;
  const data = await Comment.create({
    description: description,
    user: user,
    blog: id,
  });
  if (data)
    return res
      .status(200)
      .json(new apiResponse(200, { data }, "you have a comment in this post"));
});

export const GetBlog = asyncHandler(async (req, res) => {
  const data = await Blog.find()
    .sort({
      createdAt: -1,
    })
    .populate("owner")
    .exec();
  var response = [];
  for (let i = 0; i < data.length; i++) {
    const blog = data[i]._id;

    const user = req.data._id;
    const exist = await Like.findOne({ user, blog });
    const commentCount = await Comment.find({ blog }).count();
    const likeCount = await Like.find({ blog, val: 1 }).count();
    var obj;
    if (exist) {
      obj = { ...data[i], reaction: exist };
    } else {
      obj = { ...data[i], reaction: { val: 0 } };
    }
    obj = { ...obj, comments: commentCount, likes: likeCount };
    response.push(obj);
  }
  return res
    .status(200)
    .json(new apiResponse(200, { response }, "all the blogs fetched"));
});

export const GetMyBlog = asyncHandler(async (req, res) => {
  console.log("GetMyBlog:-", req.params.id);
  const userName = req.params.id;
  // console.log(user)
  if (!userName) throw new apiError(401, "Unauthorized Request");

  const user = await User.findOne({ userName: userName });
  const posts = await Blog.find({ owner: user._id })
    .sort({
      createdAt: -1,
    })
    .populate("owner")
    .exec();
  console.log(posts);
  var response = [];
  for (let i = 0; i < posts.length; i++) {
    const blog = posts[i]._id;

    const exist = await Like.findOne({ user: user._id, blog });
    const commentCount = await Comment.find({ blog }).count();
    const likeCount = await Like.find({ blog, val: 1 }).count();
    var obj;
    if (exist) {
      obj = { ...posts[i], reaction: exist };
    } else {
      obj = { ...posts[i], reaction: { val: 0 } };
    }
    obj = { ...obj, comments: commentCount, likes: likeCount };
    response.push(obj);
  }
  // const post= await Blog.find({owner:user._id})

  res.status(200).json(new apiResponse(200, { response }, "Done"));
});

export const GetComment = asyncHandler(async (req, res) => {
  const { id, no } = req.body;
  const skipAmount = no * 5;
  const result = await Comment.find({ blog: id })
    .skip(skipAmount)
    .limit(5)
    .populate("user")
    .exec();
  res.status(200).json(new apiResponse(200, { result }, "Comment fetched"));
});

export const GetRandomBlog = asyncHandler(async (req, res) => {
  var data = await Blog.find()
    .sort({
      createdAt: -1,
    })
    .populate("owner")
    .exec();
  for (let i = 0; i < data.length; i++) {
    const blog = data[i]._id;
    const commentCount = await Comment.find({ blog }).count();
    const likeCount = await Like.find({ blog, val: 1 }).count();
    data[i] = {...data[i],comments: commentCount, likes: likeCount };
  }
  return res
    .status(200)
    .json(new apiResponse(200, { data }, "all the blogs fetched"));
});

// Delete UserBlog Controllers by User.
export const deleteMyBlog=asyncHandler(async(req,res)=>{
    const {blogId}=req.body;
    const userId=req.data._id;
    const data=await Blog.findOneAndDelete({_id:blogId,owner:userId});
    if(!data) return res.status(404).json(new apiResponse(404, {}, "You are not allowed to delete this blog"))
    console.log(data);
    return res
    .status(200)
    .json(new apiResponse(200, { data }, "Blog Deleted Successfully"));
}
)