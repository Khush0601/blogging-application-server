// //creating blog schema
const mongoose=require('mongoose')

const blogSchema=new mongoose.Schema({
   blogBanner:{
    type:String,
    required:true,
   },
   title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  userId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'user',
    required:true,
  },
  likeCount:{
    type:Number,
    default:0,
  },
  comment:{
   type:[mongoose.SchemaTypes.ObjectId],
   ref:"comments",
   default:[]
  }
  

},{ timestamps: true })
module.exports=mongoose.model('Blog', blogSchema);