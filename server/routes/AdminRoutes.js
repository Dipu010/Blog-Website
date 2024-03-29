import express from "express";
const adminRoute = express.Router();

import { dataBlog, dataUser,showBlogID, showProfileAdmin} from "../controllers/adminControllers.js";


adminRoute.post('/showProfile',showProfileAdmin)
adminRoute.get('/showUserData',dataUser)
adminRoute.get('/showBlogData',dataBlog)
adminRoute.post('/showBlogID',showBlogID)

export default adminRoute

