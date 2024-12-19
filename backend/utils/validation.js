const {body, validationResult}=require("express-validator");

const createTransactionValidation=[
    body("description").notEmpty().withMessage("Description is required"),
    body("amount").notEmpty().withMessage("Amount is required"),
    body("transactionType").notEmpty().withMessage("Transaction type is required")
];

const checkValidation=(req,res,next)=>{
    try {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            const errorList={};
            const errorMap=errors.mapped();
            for(let error in errorMap){
                errorList[error]=errorMap[error].msg;
            }
            res.status(400).json({
                msg:"fields required",
                errors:errorList
            });
        }
        else return next();
    } catch (error) {
        next(error);
    }
}

module.exports={
    createTransactionValidation,
    checkValidation,
    // other middleware functions can be added here as needed...
 };