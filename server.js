const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()
const PORT = process.env.PORT||8000
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/register').then(()=>{
    console.log("Connected to Database")
}).catch(err=>{console.log('error',err)})
const itemRoutes  = require('./routes/auth')
app.use('/api',itemRoutes)
app.listen(PORT,()=>{
    console.log('Server started at port 8000')
})