const jwt = require('jwt-simple');
const moment = require('moment');
const env = require('../env');


let createToken = function(user){

    let payload = {
        sub : user._id,
        name : user.name,
        surname : user.surname,
        email : user.email,
        cell : user.cell,
        status : user.status,
        image : user.image,
        image_path : user.image_path,
        country : user.country,
        address : user.address,
        city : user.city,
        cap : user.cap,
        iat : moment().unix(),                           
        exp : moment().add(1,'days').unix()              
    };

    return jwt.encode(payload , env.secret_key );
}



module.exports = createToken;







