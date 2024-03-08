import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const dbConnector=async ()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGODBURL}/${process.env.DB_NAME}`);
        console.log(`MONGO_DB Connected !!!! DB:HOST:${connectionInstance.connection.host}`);
    }
    catch(error){
        console.error("Error in MONGO_DB Connection: ",error);
        process.exit(1);
    }
}



export default dbConnector;