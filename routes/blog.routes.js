const blogController=require('../controller/blog.controller')
module.exports=(app)=>{
    app.post('/bloggingApplication/api/v1/blog/createBlog',blogController.createBlog)
    app.get('/bloggingApplication/api/v1/blog/getAllBlogs',blogController.getAllBlogs)
    app.get('/bloggingApplication/api/v1/blog/:blogId',blogController.getBlogsById)
    app.patch('/bloggingApplication/api/v1/blog/updateBlog',blogController.updateBlog)
    app.delete('/bloggingApplication/api/v1/blog/deleteBlog',blogController.deleteBlog)
}