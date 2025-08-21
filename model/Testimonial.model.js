const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    image: {
      type: String,       
      required: true,     
      
    },
    name: {
      type: String,
      required: true,     
      
    },
    designation: {
      type: String,       
      required: true,
    },
    desc: {
      type: String,      
      required: true,
        
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
