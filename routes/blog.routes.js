const blogController=require('../controller/blog.controller')
module.exports=(app)=>{
    app.post('/bloggingApplication/api/v1/blog/createBlog',blogController.createBlog)
}