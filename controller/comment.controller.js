const blogModel = require("../model/blog.model")
const userModel = require("../model/user.model")
const commentModel=require('../model/comment.model')

exports.addComment = async (req, res) => {
  try {
    const userId = req.userId; 
    const { commentMessage, blogId } = req.body;

    if (!commentMessage || !blogId) {
      return res.status(400).json({ message: "commentMessage and blogId are required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const savedComment = await commentModel.create({
      userId,
      commentMessage,
      blogId,
    });

    blog.comment.push(savedComment._id);
    await blog.save();
   
    await userModel.findByIdAndUpdate(userId, {
      $addToSet: { commentBlogs: blogId }
    });
    
    res.status(201).json({
      commentId: savedComment._id,
      userId: {
        name:user.name,
        image:user.image
      },
      commentMessage: savedComment.commentMessage,
      createdAt: savedComment.createdAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while adding comment", error: err.message });
  }
};

exports.getAllCommentOfBlogId=async(req,res)=>{
    const blogId=req.params.blogId;
    try{
     const commentId=await commentModel.find({blogId:blogId}).populate('userId', 'name image').sort({ createdAt: -1 });
     res.status(200).send(commentId)
    }
    catch(err){
    res.status(500).send({
        message:'error while getting comment'
    })
    }
}

