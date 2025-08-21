const testimonialController = require('../controller/testimonial.controller');


module.exports = app => {
  app.post('/bloggingApplication/api/v1/blog/testimonial/postTestmonial', testimonialController.postTestimonial);
  app.get('/bloggingApplication/api/v1/blog/testimonial/getTestmonial', testimonialController.getAllTestimonials);
};
