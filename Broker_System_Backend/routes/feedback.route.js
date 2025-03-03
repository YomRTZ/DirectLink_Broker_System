const express = require("express");
const{getAllFeedback,createFeedback} = require("../controllers/feedback.controller");
const router = express.Router();
const {
  getAllFeedback,
  createFeedback,
} = require("../controllers/feedback.controller");

router.get("/get",getAllFeedback);
router.post("/create",createFeedback);

module.exports = router;
