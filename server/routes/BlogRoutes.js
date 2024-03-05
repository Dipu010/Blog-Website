import express from "express"
const routes=express.Router();
import {Register,Login,forgetPassword,ChangePassword} from "../controllers/userController";


routes.post("/register",Register);
routes.post("/login",Login);
routes.post("/forgetPassword",forgetPassword);
routes.post("/register",ChangePassword);