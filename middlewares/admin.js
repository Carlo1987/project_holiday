

exports.admin = function(req,res,next){
    let params = req.body;

    if(params.role != 'admin'){
        res.status(200).send({message: "You must be an Administrator!" });
    }else{
        next();
    }
   
}


