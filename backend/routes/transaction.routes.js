const express=require("express");
const {  checkValidation, createTransactionValidation } = require("../utils/validation");
const { createTransaction, getAllTransaction } = require("../controller/transaction.controller");
const transactionRouter=express.Router();

transactionRouter.post("/",createTransactionValidation,checkValidation,createTransaction);
transactionRouter.get("/all",getAllTransaction);

module.exports={
    transactionRouter
}