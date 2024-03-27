import express from "express";
const blogRoute = express.Router();
import { CreateBlog ,UpdateBlog, LikeBlog,CommentBlog,GetBlog, GetMyBlog , GetComment,GetRandomBlog, deleteMyBlog} from "../controllers/blogController.js";
import { SearchName, getallTags, searchBlog } from "../controllers/searchController.js";
import { FollowPerson , GetNotifictionCount ,GetNotification} from "../controllers/followController.js";
import {auth, isAdmin} from "../middlewares/auth.js";
 import { deleteBlog } from "../controllers/adminControllers.js";

//blog posting route
blogRoute.post("/createblog", auth, CreateBlog);
blogRoute.post("/updateblog", auth, UpdateBlog);
blogRoute.post("/likeblog", auth, LikeBlog);
blogRoute.post("/commentblog", auth, CommentBlog);
blogRoute.get("/getblog", auth, GetBlog);
blogRoute.post("/getcomment", GetComment);
blogRoute.get("/getrandomblog",GetRandomBlog);
//following route
blogRoute.post("/follow",auth,FollowPerson);
blogRoute.get("/myblog/:id",auth,GetMyBlog);

//notification route
blogRoute.post("/notificationcount",auth,GetNotifictionCount);
blogRoute.post("/getnotification",auth,GetNotification);
 
//searching route
blogRoute.post('/searchname',SearchName);
blogRoute.post('/searchblog',auth,searchBlog)
blogRoute.get('/tags',getallTags)

// Delete blog Route
blogRoute.post('/deleteblogadmin',auth,isAdmin,deleteBlog);
blogRoute.post('/deleteblogbyme',auth,deleteMyBlog);
export default blogRoute;
