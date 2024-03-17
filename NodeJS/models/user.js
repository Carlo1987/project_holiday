const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    cell: Number,
    password: String,
    status: String,
    image: String,
    image_path:String,
    address: String,
    city: String,
    cap: String
});


module.exports = mongoose.model('User' , UserSchema);