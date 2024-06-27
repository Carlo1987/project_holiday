const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExtraSchema = Schema({
    current_year:Number,
    reserve_days:{
        min:String,
        max:String,
      },
      hours:{
        checkIn:{
          start:Number,
          end:Number
        },
        checkOut:{
          start:Number,
          end:Number
        }
      },
      limit_mounthReserve:Number,
      discount:{
        days_discount:Number,
        value_discount:Number,
      },
      advance:Number,
      refund:{
        mode: String,
        days:Number,
        limit:String,
        date:String,
        hour:String,
        value:Number
      },
      clean:Number,
});


module.exports = mongoose.model('Extra',ExtraSchema);