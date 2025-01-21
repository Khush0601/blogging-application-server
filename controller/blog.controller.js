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