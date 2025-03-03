const Review = require("../models/review.model");

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createReview = async (req, res) => {
  const { tenantId, propertyId, rating, comment,timestamp  } = req.body;
  const newReview = new Review({
    tenantId,
    propertyId,
    rating,
    comment,
    timestamp,
  });
  try {
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
