const jwt = require('jwt-simple');
const moment = require('moment');
const env = require('../env');

exports.authenticated = function(req,res,next){

    if(req.get('Authorization') == null || req.get('Authorization') == undefined){
        return  res.status(200).send({  message : "Error: empty token" });
    }else{

        let token  = req.header('Authorization').replace(/['"]+/g, '');
  
        try{
            let payload = jwt.decode(token , env.secret_key);
    
            if(payload.exp <= moment().unix()){
                return  res.status(200).send({ message : "Token expired" });
            }else{
                req.user = payload
                next();
            } 
        }catch(err){
            return  res.status(200).send({ message : ''+err });
        }
      
    } 

}

