import { Blog } from "../models/Blog.js";
import { Like } from "../models/Like.js";
import { Comment } from "../models/Comment.js";
import { cloudinary } from "../utils/cloudinary.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

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
    owner:user,
    summary,
    tags,
  });
  if (!data) throw new apiError(500, "something went wrong!! please try again");
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
  const exist = await Like.findOne({user:user,blog:id})
  if(exist){
    if(val==1 && exist.val==1){
      const data = await Like.findOneAndDelete({_id:exist._id});
      return res.status(200).json(new apiResponse(200, { data }, "Your like is removed"));
    }
    else if(val==1 && exist.val==-1){
      const data= await Like.findByIdAndUpdate({_id:exist._id},{val:1})
      return res.status(200).json(new apiResponse(200, { data }, "Blog is Liked"));
    }
    else if(val==-1 && exist.val==1)
    {
      const data= await Like.findByIdAndUpdate({_id:exist._id},{val:-1})
      return res.status(200).json(new apiResponse(200, { data }, "Blog is disliked"));
    }
    else if(val==-1 && exist.val==-1){
      const data = await Like.findOneAndDelete({_id:exist._id});
      return res.status(200).json(new apiResponse(200, { data }, "Your dislike is removed"));
    }
  }
  const data = await Like.create({ val: val, user: user, blog: id });
  return res.status(200).json(new apiResponse(200, { data }, "Blog is Liked/disliked"));
});



export const CommentBlog = asyncHandler(async (req, res) => {
 
  const { description, id } = req.body; //Here Id id blogId
  const user = req.data._id;
  const data = await Comment.create({
    description: description,
    user: user,
    blog: id,
  });
  if(data) return res.status(200).json(new apiResponse(200, { data }, "you have a comment in this post"));
  
})

export const GetBlog = asyncHandler(async(req,res)=>{
  const data =await  Blog.find().sort({
    createdAt:-1
    }).populate("owner").exec();
  const response=[];
  for(let i=0;i<data.length;i++){
    
    const blog = data[i]._id;

    const user = req.data._id;
    const exist = await Like.findOne({user,blog});
    const commentCount = await Comment.find({blog}).count();
    const likeCount = await Like.find({blog,val:1}).count();
    var obj;
    if(exist){
      obj = {...data[i],reaction:exist};
    }
    else {
      obj = {...data[i],reaction:{val:0}};
    }
    obj = {...obj,comments:commentCount,likes:likeCount};
    response.push(obj);
  }
  return res.status(200).json(new apiResponse(200, { response }, "all the blogs fetched"));
})

export const GetMyBlog=asyncHandler(async(req,res)=>{

  const user=req.data
  console.log(user)
  if(!user)
    throw new apiError(401,"Unauthorized Request")
  
    const posts= await Blog.aggregate(
      [
        {
          '$match': {owner: new mongoose.Types.ObjectId(user._id)}
        }
      ]
    )
    
    // const post= await Blog.find({owner:user._id})
    

    res.status(200).json(new apiResponse(200,{posts},"Done"))

})

export const GetComment = asyncHandler(async(req,res)=>{
  const{id,no} = req.body;
  const skipAmount = no*5;
  const result = await Comment.find({blog:id}).skip(skipAmount).limit(5).populate("user").exec();
  res.status(200).json(new apiResponse(200,{result},"Comment fetched"));
})
