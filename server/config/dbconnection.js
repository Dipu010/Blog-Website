import { connect } from "mongoose";
require("dotenv").config();

const dbConnector = ()=>{
    connect(process.env.DB_URL)
        .then(()=>(console.log("MOngo Connected")))
        .catch((error)=>(console.log(error.message)));
}

export default dbConnector;