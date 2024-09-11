const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const bodyParser=require('body-parser')
const dotenv=require('dotenv');
const app=express()
dotenv.config()
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => console.log('connected to db'))
.catch((err)=>console.log(err))

const expenseRoutes= require('./routes/expense')
app.use('/api/expense',expenseRoutes)

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))