import express from "express"
const routes=express.Router();
import { Login,Register,ChangePassword,forgetPassword } from "../controllers/userController.js";
import auth from "../middlewares/auth.js"

routes.post("/register",Register);
routes.post("/login",Login);
routes.post("/forgetPassword",forgetPassword);
routes.post("/register",auth,ChangePassword);

export default routes