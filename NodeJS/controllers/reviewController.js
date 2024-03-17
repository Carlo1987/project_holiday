const Review = require('../models/review');
const User = require('../models/user');

const general_error_message = "Errore durante il procedimento";


function setHour(date){
    let result = date;
    let numbers = [1,2,3,4,5,6,7,8,9];
   if(numbers.some(e=> e == date)){
        result = '0'+date;
   }
   return result;
}


/* function mounth(index){
    const mounths = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
    return mounths[index-1];
} */


function date_review(){
    let date = new Date();
    return  date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' - '+setHour(date.getHours())+':'+setHour(date.getMinutes());
}


let controller = {

    save: function(req,res){
       
        let params = req.body;
        let review = new Review();
        review.user_id = params.user_id;
        review.home_id = params.home_id;
        review.user_name = '';
        review.user_surname = '';
        review.user_image = '';
        review.assessment = params.assessment;
        review.review = params.review;
        review.date = date_review();
        review.progressive = params.progressive;

        review.save(function(error,reviewSaved){
            if(error) return res.status(500).send({message:general_error_message+': '+error});

            if(!reviewSaved) return res.status(200).send({message: "Errore durante il salvataggio"});

            return res.status(200).send({review : reviewSaved});
        }) 
    },



    getReview: function(req,res){
        let id = req.params.id;
        Review.findById(id, function(error,reviewFounded){
            if(error) return res.status(500).send({message:general_error_message+': '+error});

            if(!reviewFounded) return res.status(404).send({message: "Recensione non trovata"});

            return res.status(200).send({review : reviewFounded});
        })
    },



    getLastReview: function(req,res){
        Review.find(function(error,review){
            if(error) return res.status(500).send({message:general_error_message+': '+error});

            if(!review) return res.status(200).send({progressive:1});

            return res.status(200).send({review:review});
        }).sort({progressive:-1}).limit(1);
    },



    getReviewHome: function(req,res){
        let home_id = req.params.id;
        Review.find({home_id:home_id}, (error,reviewsFounded)=>{
            if(error) return res.status(500).send({message:general_error_message+': '+error});

            if(!reviewsFounded) return res.status(200).send({message: "Non ci sono recensioni su questa casa"});

            return res.status(200).send({reviews : reviewsFounded});
        }).sort({progressive : -1});
    },



    updateReview: function(req,res){
        let id = req.params.id;
        let params = req.body;
        let data = {
            user_id : params.user_id,
            home_id : params.home_id,
            user_name : '',
            user_surname : '',
            user_image : '',
            assessment : params.assessment,
            review : params.review,
            date : date_review(),
            progressive : params.progressive
        }
        Review.findByIdAndUpdate(id, data, (error,reviewUpdated)=>{
            if(error) return res.status(500).send({message:general_error_message+': '+error});

            if(!reviewUpdated) return res.status(404).send({message: "Recensione non trovata"});

            return res.status(200).send({review : reviewUpdated});
        })
    },



    getAvatar: function(req,res){
        let user_id = req.params.id;
        User.findById(user_id , (error,userFounded)=>{
            if(error) return res.status(500).send({message:general_error_message+': '+error});

            if(!userFounded) return res.status(404).send({message: "Utente non trovato"});

            return res.status(200).send({user:userFounded});
        })
    },




    delete: function(req,res){
        let id = req.params.id;

        Review.findByIdAndRemove(id, (error,reviewDeleted)=>{
            if(error) return res.status(500).send({message:general_error_message+': '+error});

            if(!reviewDeleted) return res.status(404).send({message: "Recensione non trovata"});

            return res.status(200).send({review:reviewDeleted});
        })
    },







}


module.exports = controller;