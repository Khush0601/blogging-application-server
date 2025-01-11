// creating schema  of user

const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:()=>{
            return Date.now()
        },
        immutable:true
    },
    updatedAt:{
        type:Date,
        default:()=>{
            return Date.now()
        }
    }
})
module.exports=mongoose.model('user',userSchema)