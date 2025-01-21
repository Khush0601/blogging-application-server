// user Controller
const UserModel=require('../model/user.model')
const bcrypt=require("bcryptjs")
const nodemailer=require("nodemailer")
const crypto=require('crypto')
 const otpModel=require('../model/otp.model')
 const {otpTemplate}=require('../utils/otpTemplate')
 
 const transporter = nodemailer.createTransport({
     host: 'smtp.gmail.com',
     port: 465,
    
     auth: {
         user: process.env.EMAIL_SERVICE_USER, // Your email
         pass: process.env.EMAIL_SERVICE_PASS, // Your email password or app password
     },
     secure:true,
 });


exports.generateOtp=async(req,res)=>{
  try{
    let email=req.body.email;
    let otp=crypto.randomInt(1000,9999)
    otp=otp.toString()
    console.log(otp)
    let saveOtp=await otpModel.create({email,otp})
    console.log(saveOtp)
    const mailObj = {
      from:process.env.EMAIL_SERVICE_USER,
      to: email,
      subject: 'OTP Verification',
      html: otpTemplate(saveOtp.otp,saveOtp.email) ,
    };
    transporter.sendMail(mailObj, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Email was send successfully');
      }
    })
   res.status(200).send({
    message:'otp generating'
   })
  }
  catch(err){
    console.log(err)
    res.status(500).send(err.message)
  }
}

exports.verifyOtp=async(req,res)=>{
try{
  const {email,otp}=req.body;
  const savedOtp=await otpModel.findOne({email})
  if(savedOtp.otp===otp){
    return res.status(200).send({
      message:' otp verified',
      isVerified:true,
    })
  }
  else{
    return res.status(404).send({
      message:'otp is invalid',
      isVerified:false,
    })
  }
}
catch(err){
  res.status(500).send({
    message:'something went wrong'
  })
}
}


exports.signUp=async(req,res)=>{
    try{
       const userObj={
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8),
       }
       const savingUser=await UserModel.create(userObj)
       const message={
        message:'register successfully'
      }
       if(savingUser){
        return res.status(201).send(message)
     }

     else{
     return  res.status(404).send({
        message:"register unsuccessfull"
       })
     }
    }
    catch(err){
      console.log(err)
        res.status(500).send({
            message:err?.message
        })
     }
    }

    exports.signIn=async(req,res)=>{
      try{
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
       const userEmail= req.body.email;
       console.log(userEmail)
       const passwordFromReq=req.body.password;
       console.log(passwordFromReq)
       const validUserData=await UserModel.findOne({email:userEmail})
       if(!validUserData){
        return res.status(404).send({
          message:'user not found'
        })
       }
      const isValidPassword=bcrypt.compareSync(passwordFromReq,validUserData.password)
      if(!isValidPassword){
        return res.status(401).send({
          message:'invalid credentials'
        })
      }
      const {password,...restData}=validUserData._doc
      return res.status(200).send(restData)
      }
      catch(e){
        console.log(e)
        return res.status(500).send({
          message:'internal server error'
        })
      }
    }