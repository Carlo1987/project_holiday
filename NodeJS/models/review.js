const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = Schema({
    user_id:String,
    home_id:String,
    user_name:String,
    user_surname:String,
    user_image:String,
    assessment:Number,
    review:String,
    date:String,
    progressive:Number
});

module.exports = mongoose.model('Review',ReviewSchema);