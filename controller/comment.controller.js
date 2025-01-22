const blogModel = require("../model/blog.model")
const userModel = require("../model/user.model")
const commentModel=require('../model/comment.model')

exports.addComment=async(req,res)=>{
    try{
     const commentObj={
        userId:req.body.userId,
        commentMessage:req.body.commentMessage,
        blogId:req.body.blogId,
      }
      console.log(commentObj)
      const user=await userModel.findById(commentObj.userId)
      const saveComment=await commentModel.create(commentObj)
      // saving  comment to the blog 
      const findBlog=await blogModel.findById(commentObj.blogId)
      findBlog.comment.push(saveComment._id)
      await findBlog.save()

      const requiredCommentData={
       userName:user.name,
       userImage:user.image,
       commentMessage:saveComment.commentMessage
      }
      res.status(201).send(requiredCommentData)

    }
    catch(err){
        console.log(err)
      res.status(500).send({
        message:'error while adding comment',
        error:err
      })
    }
}