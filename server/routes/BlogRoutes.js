import express from "express"
const routes=express.Router();
import {Register,Login,forgetPassword,ChangePassword} from "../controllers/userController";
const auth = require("../middlewares/auth");

routes.post("/register",Register);
routes.post("/login",Login);
routes.post("/forgetPassword",forgetPassword);
routes.post("/register",auth,ChangePassword);
module.exports=routes;