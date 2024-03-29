import {User} from "../models/User.js"
import { Blog } from "../models/Blog.js";
  import dotenv from "dotenv";
dotenv.config();
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { Follow } from "../models/Follow.js";
import mongoose from "mongoose";

    // Ability to delete any blog
     
const deleteBlog=asyncHandler(async(req,res)=>{
      const {blogId}=req.body;
      const admin=req.data;
      console.log(`Post is deleted by${admin.accountType}`);
  
      const data=await Blog.findOneAndDelete({_id:blogId},{new:true});
      console.log(data);
      if(!data)  
          throw new apiError(500,'Data not found');

      return res.status(200).json(new apiResponse(201,"Blog SuccessFully Deleted",{_id:blogId}));
      
      }
)

const showBlogID=asyncHandler(async(req,res)=>{
   const {userName}=req.body;


    const data=await Blog.aggregate(
      [
        {
          '$lookup': {
            'from': 'users', 
            'localField': 'owner', 
            'foreignField': '_id', 
            'as': 'user'
          }
        }, {
          '$addFields': {
            'user': {
              '$first': '$user'
            }
          }
        }, {
          '$match': {
            'user.userName':userName
          }
        }, {
          '$project': {
            'picture': 1, 
            'title': 1
          }
        }
      ]
    )

    return res.status(200).json(new apiResponse(200,"fetched all blogs",{data}))
})

const showProfileAdmin=asyncHandler(async(req,res)=>{

  const {userName}=req.body

  const userData=await User.findOne({userName:userName});

  if(!userData)
    throw new apiError(404,"User not exists")

  const numberOfFollowers=await Follow.aggregate(
    [
      {
        '$match': {
          'following': new mongoose.Types.ObjectId(userData._id)
        }
      }, {
        '$group': {
          '_id': null, 
          'followerCount': {
            '$sum': 1
          }
        }
      }
    ]
  )



  

  return res.status(200).json(new apiResponse(200,"Fetched",{numberOfFollowers}))


})


const dataUser=asyncHandler(async(req,res)=>{

    

      const data=await User.aggregate(
        [
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              count: { $sum: 1 } // Count the number of documents in each group
            }
          },
          {
            $sort: { _id: 1 } // Optionally, sort the results by date
          }
        ]
      )

      let arr=[]
      let countUser=0;
      data.forEach(element => {
          countUser+=element.count
          arr.push({
            "name":element._id,
            "pv":countUser
          })
      });

      res.status(200).json(new apiResponse(200,"Fetched data",{arr}))


})

const dataBlog=asyncHandler(async(req,res)=>{

      const data=await Blog.aggregate(
        [
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              count: { $sum: 1 } // Count the number of documents in each group
            }
          },
          {
            $sort: { _id: 1 } // Optionally, sort the results by date
          }
        ]
      )
      let arr=[]
      let countBlog=0;
      data.forEach(element => {
          countBlog+=element.count
          arr.push({
            "name":element._id,
            "pv":countBlog
          })
      });

      return res.status(200).json(new apiResponse(200,"Fetched all blogs",{arr}))

})

export {deleteBlog,showProfileAdmin,dataUser,dataBlog,showBlogID}

