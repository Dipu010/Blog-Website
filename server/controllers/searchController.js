import { User } from "../models/User.js";
import { Blog } from "../models/Blog.js";
import dotenv from "dotenv";
dotenv.config();
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { Like } from "../models/Like.js";
import { Comment } from "../models/Comment.js";

export const SearchName = asyncHandler(async (req, res) => {
  const { nameToSearch } = req.body;
  if(nameToSearch.length==0)
    return  res
    .status(200)
    .json(new apiResponse(200, {  }, "search empty"));
  var flag = 0;
  for (let i = 0; i < nameToSearch.length; i++) {
    if (nameToSearch[i] === " ") {
      flag = 1;
    }
  }
  var parts;
  if (flag) {
    parts = nameToSearch.split(" ");
  }
  var data;
  if (!flag) {
    data = await User.aggregate([
      {
        '$match': {
          '$or': [
            {
              'userName': new RegExp('^'+nameToSearch, 'i')
            }, {
              'firstName': new RegExp('^'+nameToSearch, 'i')
            }
          ]
        }
      }
    ]);
  } else {
    data = await User.aggregate([
      {
        $match: {
          firstName: {
            $regex: new RegExp("^" + parts[0], "i"),
          },
        },
      },
      {
        $match: {
          lastName: {
            $regex: new RegExp("^" + parts[1], "i"),
          },
        },
      },
    ]);
  }
  return res
    .status(200)
    .json(new apiResponse(200, { data }, "users found"));
})

//Search the Blog using its tags.
export const searchBlog=asyncHandler(async(req,res)=>{
   const {tags}=req.body;
   console.log(tags)
  //  const tagsArray = tags.map(tag => tag.label);
  // console.log(tagsArray)
//   {'tags': {
//     $elemMatch: {
//       $or: [
//         { 'label': { $in: searchTags } },
//         { 'value': { $in: searchTags } }
//       ]
//     }
//   }
// }
  // const searchTags=tags.split(',').map(tag => tag.trim())
        const results = await Blog.find({
            'tags.label':tags
        } ).populate('owner')
          .exec()
   console.log(results);
   var response=[]
   for (let i = 0; i < results.length; i++) {

    const blog = results[i]._id;
     const user=req.data;

    const exist = await Like.findOne({ user:user._id, blog });
    const commentCount = await Comment.find({ blog }).count();
    const likeCount = await Like.find({ blog, val: 1 }).count();
    var obj;
    if (exist) {
      obj = { ...results[i], reaction: exist };
    }
    else {
      obj = { ...results[i], reaction: { val: 0 } };
    }
    obj = { ...obj, comments: commentCount, likes: likeCount };
    response.push(obj);
  }
   if(!results) throw new apiError("Blog not found");
   res.status(200).json(new apiResponse(200, {response }, "Blog found"))
}
)
export const getallTags=asyncHandler(async(req,res)=>{
  const tags = await Blog.aggregate([
    { $unwind: '$tags' }, // Deconstructs the array field from the input documents
    { $group: { 
        _id: { label: '$tags.label', value: '$tags.value' }, // Group by both label and value to get unique pairs
        count: { $sum: 1 } // Counts occurrences (optional, might be useful for some use cases)
      } 
    },
    { $project: { _id: 0, label: '$_id.label', value: '$_id.value', count: 1 } } // Project the desired output
  ]);
  res.status(200).json(new apiResponse(201,{tags},"Tags Found"));
})


