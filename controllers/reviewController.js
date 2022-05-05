const Review = require('../models/reviewModal');
const Plan = require('../models/planModel');

const getAllReviews = async(req, res) => {
    try {
        const reviews = await Review.find();

        if(reviews) {
            res.status(200).json({
                msg: "reviews retrieved",
                data: reviews
            })
        } else {
            res.status(404).json({
                msg: "review not found",
            })
        }

    } catch(err) {
        res.status(400).json({
            msg: err.message
        })
    }
}

const top3Reviews = async(req, res) => {
    try {
        const top3Reviews = await Review.find().sort({
            rating: -1
        }).limit(3);

        if(top3Reviews) {
            res.status(200).json({
                msg: "top 3 reviews retrieved",
                data: top3Reviews
            })
        } else {
            res.status(404).json({
                msg: "review not found",
            })
        }

    } catch(err) {
        res.status(400).json({
            msg: err.message
        })
    }
}

const getReview = async(req, res) => {
    try {
        let { id } = req.params;
        const review = await Review.findById(id);

        if(review) {
            res.status(200).json({
                msg: "review retrieved",
                data: review
            })
        } else {
            res.status(404).json({
                msg: "review not found",
            })
        }

    } catch(err) {
        res.status(400).json({
            msg: err.message
        })
    }
}

// requires a plan id to make review on that plan
const createReview = async(req, res) => {
    try {
        let { planId } = req.params;
        let createdReview = await Review.create(req.body);

        let docs = await Review.countDocuments({ plan: planId });
        let plans = await Review.find({ plan: planId });
        let ratingArr = [];

        for(let i = 0; i < plans.length; i++) {
            ratingArr.push(plans[i].rating);
        }

        function myFunc(total, num) {
            return total + num;
        }

        let averageRating = ratingArr.reduce(myFunc);

        await Plan.findByIdAndUpdate(
            planId, 
            { ratingAverage: averageRating / docs  },
            { new: true }
         )

        res.status(201).json({
            msg: 'Review Created Successfully',
            data: createdReview
        })
    } catch(err) { 
        res.status(400).json({
            msg: err.message
        })
    }
}

const updateReview = async(req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);
        if(review) {
            let updatedReview = await Review.findByIdAndUpdate(id, req.body, { new: true });
            res.status(201).json({
                msg: 'review updated successfully',
                data: updatedReview
            });
        } else {
            res.status(400).json({
                msg: "Review does not exist"
            })
        }
    } catch(err) {
        res.status(400).json({
            msg: err.message
        })
    }
}

const deleteReview = async(req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);
        if(review) {
            let deletedReview = await Review.findByIdAndDelete(id);
            res.status(201).json({
                msg: 'review deleted successfully',
                data: deletedReview
            });
        } else {
            res.status(400).json({
                msg: "Review does not exist"
            })
        }
    } catch(err) {
        res.status(400).json({
            msg: err.message
        })
    }
}

module.exports = {
    getAllReviews,
    top3Reviews,
    getReview,
    createReview,
    updateReview,
    deleteReview
}