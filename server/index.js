import express from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import dbConnector from "./config/dbconnection.js";
import { cloudinary } from "./utils/cloudinary.js";
import bodyParser from "body-parser"

const port=process.env.PORT || 5000;
// Parse JSON bodies
app.use(express.json({ limit: '5mb' }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    methods:["GET","POST"],
    credentials:true
}))

import routes from "./routes/UserRoutes.js";
import blogRoute from "./routes/BlogRoutes.js";
app.use('/api/v1',routes);
app.use('/api/v1',blogRoute)

app.listen(port,()=>console.log(`server started at port ${port}`))
app.get("/",(req,res)=>{
    res.send("SERVER");
})
dbConnector();