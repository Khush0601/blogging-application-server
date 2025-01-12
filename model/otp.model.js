const mongoose=require('mongoose')
const otpSchema=new mongoose.Schema({
  otp:{
    type:String,
    required:true,
    minlength: 4,
    maxlength:4
  },
  email:{
    type:String,
    required:true,
    unique:[true,'otp already generated'],

  },
  
},{timestamps:true})
otpSchema.index({createdAt:1},{expireAfterSeconds:10*60})
module.exports=mongoose.model('otp',otpSchema)