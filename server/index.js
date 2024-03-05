import express from "express";
import cors from "cors";
const app = express();
require("dotenv").config();
import cookieParser from "cookie-parser";
import dbConnector from "./config/dbconnection";

const port=process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    methods:["GET","POST"],
    credentials:true
}))
import routes from "./routes/BlogRoutes";
app.use('/api/v1',routes);

app.listen(port,()=>console.log(`server started at port ${port}`))
app.get("/",(req,res)=>{
    res.send("SERVER");
})
dbConnector();