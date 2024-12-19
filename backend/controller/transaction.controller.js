const {transactionModel}=require("../models/transaction");

//create transaction
const createTransaction=async(req,res)=>{
    try {
        const {transactionType,description,amount}=req.body;
        let creditAmount=await transactionModel.aggregate([
            {$match:{transactionType:"credit"}},
            {$group:{_id:null,total:{$sum:"$amount"}}}
        ]);
        const debitAmount=await transactionModel.aggregate([
            {
                $match:{
                    transactionType:"debit",
                }
            },
            {$group:{_id:null,total:{$sum:"$amount"}}}

        ])
        console.log(creditAmount,debitAmount);
        const totalAmount=parseFloat(creditAmount[0]?.total||0)-parseFloat(debitAmount[0]?.total||0)+parseFloat(transactionType=="debit"?-amount:amount);
        console.log(        {transactionType,description,amount,totalAmount:totalAmount}
        )
        const data=await transactionModel.create({transactionType,description,amount,totalAmount:totalAmount});
        //calculate 
        res.status(201).json({data});

    } catch (error) {
        res.status(500).json({msg:error.message});
    }
};

const getAllTransaction=async(req,res)=>{
    try {
        const data=await transactionModel.find().sort({date:-1});
        res.status(200).json({data,msg:"success"})
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

module.exports={
    createTransaction,
    getAllTransaction,
}