import { User } from "../models/User.js";
import { Blog } from "../models/Blog.js";
import dotenv from "dotenv";
dotenv.config();
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";

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
   const response= await Blog.find({tags}).populate("owner").exec();
   console.log(response);
   if(!response) throw new apiError("Blog not found");
   res.status(200).json(new apiResponse(200, {response }, "Blog found"))
}
)
