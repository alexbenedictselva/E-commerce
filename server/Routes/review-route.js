const express = require('express');
const router = express.Router();

const {AddReview, getAllReviews} = require('../Controller/review-controller')
const { getFromToken } = require('../middleware/auth-middleware');

router.post('/addReview', getFromToken, AddReview);
router.get('/getAllReview/:productId', getAllReviews);

module.exports = router;