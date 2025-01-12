// user Controller
const UserModel=require('../model/user.model')
const bcrypt=require("bcryptjs")


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
        res.status(500).send({
            message:err?.message
        })
     }
    }