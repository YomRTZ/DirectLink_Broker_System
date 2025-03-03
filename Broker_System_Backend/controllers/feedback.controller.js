const Feedback = require("../models/feedback.model");

exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createFeedback = async (req, res) => {
  const { tenantId, propertyId, feedback, description, timestamp } = req.body;

  // if (!username || !text) {
  //   return res.status(400).json({ message: "Invalid feedback data" });
  // }

  const newFeedback = new Feedback({
    tenantId,
    propertyId,
    feedback,
    description,
    timestamp,
  });

  try {
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
