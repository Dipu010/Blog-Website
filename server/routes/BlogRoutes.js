import express from "express";
const blogRoute = express.Router();
import { CreateBlog ,UpdateBlog, LikeBlog,CommentBlog } from "../controllers/blogController.js";
import auth from "../middlewares/auth.js"

blogRoute.post("/createblog",auth,CreateBlog);
blogRoute.post("/updateblog",auth,UpdateBlog);
blogRoute.post("/likeblog",auth,LikeBlog);
blogRoute.post("/commentblog",auth,CommentBlog);


export default blogRoute;
