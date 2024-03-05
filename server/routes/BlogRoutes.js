import express from "express";
const blogRoute = express.Router();
import { CreateBlog ,UpdateBlog } from "../controllers/blogController.js";
import auth from "../middlewares/auth.js"

blogRoute.post("/createblog",auth,CreateBlog);
blogRoute.post("/updateblog",auth,UpdateBlog);

export default blogRoute;
