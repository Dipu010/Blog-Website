import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnector = async()=>{
    console.log(process.env.MONGODBURL)
    connect(process.env.MONGODBURL)
        .then(()=>(console.log("MOngo Connected")))
        .catch((error)=>(console.error(error.message)));
}

export default dbConnector;