const epxress=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const port=process.env.Port||3000;
const {transactionRouter}=require("./routes/transaction.routes")
const {connectDb}=require("./config/db.config")
dotenv.config();
//db calling
connectDb();
const app=epxress();
app.use(cors())
app.use(epxress.json());

app.use("/api/v1/transactions",transactionRouter);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})