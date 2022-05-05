const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Please provide a rating'],
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Rating is required']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Review must have a user']
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
        required: [true, 'Review must belong to a plan']
    }
});

reviewSchema.pre(/^find/, function(next) {
    this.populate({
        path: "user",
        select: "name profileImg",
    }).populate("plan");
    next();
})

module.exports = mongoose.model('review', reviewSchema)