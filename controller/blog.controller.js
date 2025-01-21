const mongoose=require('mongoose')
const UserModel=require('../model/user.model')
const BlogModel=require('../model/blog.model')
exports.createBlog=async(req,res)=>{
  try{
    const blogObj={
        blogBanner:req.body.blogBanner,
        title:req.body.title,
        content:req.body.content,
        userId:req.body.userId,
      }
    
      const saveBlog=await BlogModel.create(blogObj)
      // after creating blog the user who created blog add the blog id their schema:
      const user=await UserModel.findById(blogObj.userId)
      user.blogs.push(saveBlog._id)
      await user.save()
      
      res.status(201).send({
        message:'blog created successfully',
        blog:saveBlog

      })
  }
  catch(err){
    console.log(err)
    res.status(500).send({
        message:'error while creating blog'
      })
  }

}

exports.getAllBlogs=async(req,res)=>{
   try{
     const blogs=await BlogModel.find({})
     res.status(200).send(blogs)
   }
   catch(err){
     res.status(500).send({
        message:'error while fetching'
     })
   }
}

exports.getBlogsById=async(req,res)=>{
    const blogId=req.params.blogId;
    if(!mongoose.Types.ObjectId.isValid(blogId)){
       return res.status(400).send({
           message:'invalid blogId'
       })
    }
   try{
    const blogDetails=await BlogModel.findById(blogId)
    if(!blogDetails){
        return res.status(404).send({
            message:'blog not found'
        })
    }
    else{
        return res.status(200).send(blogDetails)
    }
     
    }
    catch(err){
       res.status(500).send({
        message:err.message??'error while fetching'
       })
    }
}

exports.updateBlog=async(req,res)=>{
    try{
     
    }
    catch(err){

    }
}