import express from "express"
const routes=express.Router();
import {registerUser,loginUser,forgetPassword,ChangePassword} from "../controllers/userController.js";
import auth from "../middlewares/auth.js"

routes.post("/register",registerUser);
routes.post("/login",loginUser);
routes.post("/forgetPassword",forgetPassword);
routes.post("/register",auth,ChangePassword);

export default routes