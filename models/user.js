const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = Schema({
    id_noLogin : String,
    name: String,
    surname: String,
    email: String,
    cell: Number,
    password: String,
    status: String,
    image: String,
    image_path:String,
    country:String,
    address: String,
    city: String,
    cap: String
});


module.exports = mongoose.model('User' , UserSchema);