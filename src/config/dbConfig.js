const mongoose = require("mongoose");
const dotenv = require("dotenv");

//env vars setup
dotenv.config();
const { MONGO_URI } = process.env;
if(!MONGO_URI){
    console.error("MONGO_URI env var is undefined");
    process.exit(1);
}

//db connection
const dbConnect = () =>{
    mongoose.connect(MONGO_URI)
    .then(()=>{
        console.log("database connection established.")
    })
    .catch((error)=>{
        console.log("database connection failed.")
    })
}
dbConnect()

const clientPromise = ()=> {
    return mongoose.connection.getClient();
}

module.exports = { dbConnect, clientPromise };