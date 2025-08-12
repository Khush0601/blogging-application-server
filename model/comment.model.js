//comment schema

const mongoose=require('mongoose')

const commentSchema=new mongoose.Schema({
   userId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'user',
    required:true
   },
   blogId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Blog',
    required:true
   },
   commentMessage:{
    type:String,
    required:true,

   },

},{ timestamps: true })

module.exports= mongoose.model('comment', commentSchema);