
//   import { User } from "../models/User";
import { Blog } from "../models/Blog.js";
  import dotenv from "dotenv";
dotenv.config();
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";

    // Ability to delete any blog
     
    export const deleteBlog=asyncHandler(
        async(req,res)=>{
            const {blogId}=req.body;
            const admin=req.data;
            console.log(`Post is deleted by${admin.accountType}`);
        
            const data=await Blog.findOneAndDelete({_id:blogId},{new:true});
            console.log(data);
            if(!data)  throw new apiError(500,'Data not found');
            return res.status(200).json(new apiResponse(201,{_id:blogId},"Blog SuccessFully Deleted"));
            }
    )
