const mongoose=require('mongoose')
const UserModel=require('../model/user.model')
const BlogModel=require('../model/blog.model')
exports.createBlog=async(req,res)=>{
  try{
    const blogObj={
        blogBanner:req.body.blogBanner,
        title:req.body.title,
        content:req.body.content,
        category:req.body.category,
        userId:req.body.userId,
      }
      console.log(blogObj.userId)
       if (!blogObj.userId) {
      return res.status(400).send({
        message: 'User is required to create a blog',
      });
    }
    
      const saveBlog=await BlogModel.create(blogObj)
      const user=await UserModel.findById(blogObj.userId)
       if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
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
    let currentPage = Number(req.query?.pageNumber) ||1;
    let filterType = req.query?.type;
    let query={};
    // console.log('Filter type:', filterType);
    // console.log('Mongo query:', query);
    if(filterType && filterType !=='all' ){
      query.category = filterType;
    }
     const blogs=await BlogModel.find(query).limit(10).skip((currentPage - 1) * 10)
    
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
    const blogDetails=await BlogModel.findById(blogId).populate('userId', 'name picture');
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
     const blogId=req.body.blogId;
     const updateDetails={
        blogBanner:req.body.blogBanner,
        title:req.body.title,
        content:req.body.content,
     }
     const updateBlogDetails=await BlogModel.findByIdAndUpdate(blogId,{$set:{...updateDetails}},{new:true})
     res.status(200).send({
        message:'blog updated',
        blog:updateBlogDetails
      })
    }
    catch(err){
   console.log(e)
   res.status(500).send({
    message:'error while updating blog',
    err
   })
    }
}


exports.deleteBlog=async(req,res)=>{
    try{
    const blogId=req.body.blogId;
    if(!blogId){
      return res.status(404).send({
      message:'blogId is invalid'
    })
    }
    
    const deleteBlog=await BlogModel.findByIdAndDelete(blogId)
    if(!deleteBlog){
        return res.status(404).send({
            message:'blog is not found'
        })
    }
    res.status(200).send({
        message:'blog deleted successfully'
    })
    }
    catch(err){
     res.status(500).send({
        message:'error while deleting a blog'
     })
    }
}

exports.getUserBlogs=async(req,res)=>{
 try{
  const userId=req.params.userId;
  const blogs=await BlogModel.find({userId})
    res.status(200).send({
      message: "User blogs fetched successfully",
      blogs,
    });
 }
 catch(err){
    console.error(err);
    res.status(500).send({ message: "Error while fetching user blogs" });
 }
}