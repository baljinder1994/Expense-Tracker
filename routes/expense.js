const express=require('express')
const router=express.Router();
const Expense=require('../models/expense');

router.get('/',async(req,res) =>{
    try{
        const expenses= await Expense.find();
        res.json(expenses);
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.post('/', async(req,res) =>{
    const { title,amount,type} =req.body;
    const newExpense= new Expense( {title,amount,type})
    try{
        const savedExpense= await newExpense.save()
        res.json(savedExpense);
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

router.put('/:id', async (req,res) =>{
    const {id}=req.params;
    const {title,amount,type} =req.body;
    try{
        const updatedExpense= await Expense.findByIdAndUpdate(
            id,
            {title,amount,type},
            {new:true}
        );
        res.json(updatedExpense)
    }catch(err){
        console.error(err)
    }
})

router.delete('/:id', async(req,res)=>{
    const {id} =req.params;
    try{
        const deletedExpense= await Expense.findByIdAndDelete(id);
        res.json(deletedExpense)
    }catch(err){
        console.error(err)
    }
})
module.exports=router