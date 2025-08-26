// creating schema  of user

const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    picture:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength: 8,
    },
    googleId:{
        type:String,
    },
    isGoogleLogin:{
        type:Boolean,
        default:false
    },
    blogs:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:'blogs',
        default:[]
    },
    likedBlogs:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:'likedBlogs',
        default:[]
    },
   commentBlogs: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'blogs',
    default: []
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