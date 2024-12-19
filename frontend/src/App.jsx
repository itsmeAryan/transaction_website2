import React, { useEffect, useState } from 'react'
import *as yup from "yup";
import {useFormik} from "formik"
import {Dialog, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,Button} from "@mui/material"
import { apiClient } from './Api/apiClient.api';
const App = () => {
  
  const fetchTransation=async()=>{
    try {
      const {data}=await apiClient.get("/api/v1/transactions/all");
      settransactions(data.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  }
  useEffect(()=>{
    fetchTransation();
  },[]);
  const [initialValues, setinitialValues] = useState({
    description:"",
    amount:0,
    transactionType:"",
  })
  const validationSchema=yup.object({
    description:yup.string().required("Description is required").min(5,"Description at least 5 characters"),
    amount:yup.number().required("Amount is required"),
    transactionType:yup.string().required("Transaction type is required"),
  });
  const [transactions, settransactions] = useState([]);
  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false)
  const handleSubmit=async(values,{resetForm})=>{
    try {
      setloading(true);
      const {data}=await apiClient.post("/api/v1/transactions/",values);
      settransactions(prev=>[data.data,...prev]);
      handleModal();
    } catch (error) {
      console.log(error)
      alert("Something went wrong",error.response.data.msg);
    }finally{
      setloading(false);
      resetForm();
    }
  }
  const handleModal=()=>{
    //reset form as well
    setopen(prev=>{
      if(prev){
        formik.resetForm();
        return false;
      }
      return true;
    });
  }
  const formik=useFormik({
    initialValues,
    enableReinitialize:true,
    validationSchema,
    onSubmit:handleSubmit,
  });
  return <>
  <div style={{width:"100%",padding:"10px"}}>
 <div style={{width:"700px",margin:"10px auto"}}>
    <div style={{display:"flex",justifyContent:"flex-end",marginBottom:"10px"}}>
    <Button variant="contained" color="primary" onClick={handleModal}>Add Transaction</Button>

    </div>
 <TableContainer component={Paper} >
    <Table>
    <TableHead>
      <TableRow>
        <TableCell>Date</TableCell>
        <TableCell>Description</TableCell>
        <TableCell>Credit</TableCell>
        <TableCell>Debit</TableCell>
        <TableCell>Running Balance</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {transactions.map((transaction,index)=>(
        <TableRow key={index}>
          <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
          <TableCell>{transaction.description}</TableCell>
          <TableCell>{transaction.transactionType==='credit'?transaction.amount:'-'}</TableCell>
          <TableCell>{transaction.transactionType==='debit'?transaction.amount:'-'}</TableCell>
          <TableCell>{transaction.totalAmount}</TableCell>
        </TableRow>
      ))}
    </TableBody>
    </Table>

  </TableContainer>
 </div>
  {/* modal here */}
  <Dialog
  open={open}
  onClose={handleModal}
  >
    <DialogTitle>Add Transaction</DialogTitle>
    <DialogContent>
    <Grid container spacing={2}>
    {/* transaction type */}
    <Grid item xs={12}>
      <InputLabel>Transaction Type</InputLabel>
      <FormControl fullWidth>
  <InputLabel id="transactionType">Transaction Type</InputLabel>
  <Select
    labelId="transactionType"
    id="transactionType"
    value={formik.values.transactionType}
    label="Transaction Type"
    name="transactionType"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.transactionType&&Boolean(formik.errors.transactionType)}
    helperText={formik.touched.transactionType&&formik.errors.transactionType}
  >
    <MenuItem value={"credit"}>Credit</MenuItem>
    <MenuItem value={"debit"}>Debit</MenuItem>
  </Select>
</FormControl>
      </Grid>
    {/* description */}
    <Grid item xs={12}>
      <TextField
      type='text'
      fullWidth
      name="description"
      placeholder='Enter Description'
      label="Description"
      value={formik.values.description}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.description&&Boolean(formik.errors.description)}
      helperText={formik.touched.description&&formik.errors.description}
      />
    </Grid>
    {/* amount */}
    <Grid item xs={12}>
      <TextField
      type='number'
      name="amount"
      placeholder='Enter Amount'
      label="Amount"
      value={formik.values.amount}
      fullWidth

      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.amount&&Boolean(formik.errors.amount)}
      helperText={formik.touched.amount&&formik.errors.amount}
      />
    </Grid>
     <Grid item xs={6}>
      <Button variant="contained" color="primary" onClick={formik.handleSubmit} disabled={loading}>
        {loading?"Loading...":"Submit"}
      </Button>
     </Grid>
     <Grid item xs={6}>
      <Button disabled={loading} variant="contained" color="secondary" onClick={handleModal}>
        Cancel
      </Button>
     </Grid>

    </Grid>

    </DialogContent>


  </Dialog>
  </div>

  </>
}

export default App