const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
   First_Name:{
        type:String,
        required:true
    },
    Last_Name:{
        type:String,
        required:true
    },
    Username:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:[true,'Email is required'],
        match:[
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please Enter a valid email'
        ]
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:6,
        select: false
    }
})

module.exports = mongoose.model('Item',itemSchema)