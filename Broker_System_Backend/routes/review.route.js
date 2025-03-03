const express = require('express');
const { getAllReviews, createReview } = require('../controllers/review.controller');
const router = express.Router();

router.get('/get', getAllReviews);
router.post('/create',createReview);

module.exports = router;