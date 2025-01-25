const  admin = require("firebase-admin");
const { firebaseAdmin } = require("../firebaseAdmin");

 
 
 admin.initializeApp({
  credential: admin.credential.cert(firebaseAdmin)
});


exports.googleTokenVerification=async(req,res,next)=>{
   try{
     let authValue=req.headers.authorization
     
      if(!authValue || !authValue.includes('Bearer')){
        console.log(authValue)
          return res.status(401).send({
            message:'unauthorized token '
          })
      }
     const googleToken=authValue.replace('Bearer ','')
     const decodedData=await admin.auth().verifyIdToken(googleToken)
     req.googleData=decodedData
     next()
   }
   catch(err){
    console.log(err)
   res.status(500).send({
    message:'server error'
   })
   }
}