const commentController=require('../controller/comment.controller')
module.exports=(app)=>{
    app.post('/bloggingApplication/api/v1/blog/comment/postComment',commentController.addComment)
}