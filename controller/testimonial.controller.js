 const Testimonial = require("../model/Testimonial.model")

exports.postTestimonial = async (req, res) => {
  try {
    const { image, name, designation, desc } = req.body;
    if (!image || !name || !designation || !desc) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTestimonial = await Testimonial.create({
      image,
      name,
      designation,
      desc,
    });

    res.status(201).json({
      message: "Testimonial created successfully",
      testimonial: newTestimonial,
    });
  } catch (error) {
    console.error("Error posting testimonial:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    res.status(200).json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ message: "Server error" });
  }
};