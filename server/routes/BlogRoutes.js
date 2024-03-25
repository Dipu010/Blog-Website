import express from "express";
const blogRoute = express.Router();
import { CreateBlog ,UpdateBlog, LikeBlog,CommentBlog,GetBlog, GetMyBlog , GetComment} from "../controllers/blogController.js";
import { SearchName, getallTags, searchBlog } from "../controllers/searchController.js";
import { FollowPerson } from "../controllers/followController.js";
import auth from "../middlewares/auth.js"

//blog posting route
blogRoute.post("/createblog",auth,CreateBlog);
blogRoute.post("/updateblog",auth,UpdateBlog);
blogRoute.post("/likeblog",auth,LikeBlog);
blogRoute.post("/commentblog",auth,CommentBlog);
blogRoute.get("/getblog",auth,GetBlog);
blogRoute.post("/getcomment",GetComment);
//following route
blogRoute.post("/follow",auth,FollowPerson);
blogRoute.get("/myblog/:id",auth,GetMyBlog);
 
//searching route
blogRoute.post('/searchname',SearchName);
blogRoute.post('/searchblog',auth,searchBlog)
blogRoute.get('/tags',getallTags)

export default blogRoute;
