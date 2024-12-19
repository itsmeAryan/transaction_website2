const mongoose=require("mongoose");
const connectDb=async()=>{
    const key=process.env.mongo||"";
    try {
        await mongoose.connect(key);
        console.log("db connection established")
    } catch (error) {
        console.log("unable to connect")
    }
}

module.exports={
    connectDb
}