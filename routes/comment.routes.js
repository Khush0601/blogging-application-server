const commentController = require('../controller/comment.controller');
const verifyToken = require('../middleware/verifyToken');

module.exports = app => {
  app.post('/bloggingApplication/api/v1/blog/comment/postComment', verifyToken, commentController.addComment);
  app.get('/bloggingApplication/api/v1/blog/comment/getComment/:blogId', verifyToken, commentController.getAllCommentOfBlogId);
};
