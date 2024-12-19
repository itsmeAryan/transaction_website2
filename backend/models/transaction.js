const mongoose=require("mongoose");
const transactionSchema=mongoose.Schema({
    date:{
        type:Date,
        default:Date.now
    },
    description:{
        type:String,
        required:true
    }
    ,
    transactionType:{
        type:String,
        enum:['debit','credit'],
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    }
});
const transactionModel=mongoose.model("transaction",transactionSchema);
module.exports={
    transactionModel
}