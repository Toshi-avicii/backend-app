const mongoose = require('mongoose');
const Review = require('./reviewModal');

const planSchema = mongoose.Schema({
   name: {
       type: String,
       required: true,
       unique: true,
       maxlength: [20, 'name should not exceed more than 20 characters']
   },

   duration: {
       type: Number,
       required: [true, 'duration not entered'],
   },
   price: {
       type: Number,
       required: [true, 'price not entered'],
   },
   ratingAverage: {
       type: Number,
   },
   discount: {
       type: Number,
       validate: [function() {
            return this.discount < 100
       }, 'discount should not exceed price']
   }
});

module.exports = mongoose.model('Plan', planSchema);