const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReserveSchema = Schema({
    home_id:String,
    user_data:{
       /*  _id:String,
        name:String,
        surname:String,
        email:String,
        cell:Number */
    },
    date_reserve:String,
    checkIn:String,
    checkOut:String,
    total_nights:Number,
    guests:Number,
    clean:Number,
    discount:{
        /* set:Boolean,
        days:Number,
        value_percentage:Number,
        value:Number */
    },
    advance:{
        /* set:String,
        value:Number */
    },
    refund:{
       /*  mode:String,
        days:Number,
        date:String */
    },
    cost:{
        /* total_cost:Number,
        discounted_cost:Number,
        final_cost:Number */
    },
    payment:[],
    status:String
});


module.exports = mongoose.model('Reserve',ReserveSchema);