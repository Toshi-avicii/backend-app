const express = require('express');
const reviewRouter = express.Router();
const protectRoute2 = require('../middlewares/protectRoute2');
const { getAllReviews, getReview, top3Reviews, createReview, updateReview, deleteReview } = require('../controllers/reviewController');

reviewRouter.route('/all').get(getAllReviews);
reviewRouter.route('/top3').get(top3Reviews);
reviewRouter.route('/:planId')
    .post(protectRoute2, createReview)

reviewRouter.route('/review/:id')
    .get(getReview)
    .patch(protectRoute2, updateReview)
    .delete(protectRoute2, deleteReview); 

module.exports = reviewRouter;