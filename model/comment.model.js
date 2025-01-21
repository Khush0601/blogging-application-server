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
    ref:'product',
    required:true
   },
   commentMessage:{
    type:String,
    required:true,

    
   },

},{ timestamps: true })

const Comment = mongoose.model('comment', commentSchema);