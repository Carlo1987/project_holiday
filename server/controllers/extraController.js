const Extra = require('../models/extra');
const env = require('../env');
const path = require('path');
let email = require('../emails/emails');


let controller = {

    getExtra: function(req,res){
       let id = "656efe62f0686e616d129c0d";

        Extra.findById(id, (error,extraFounded)=>{
            if(error) return res.status(500).send({message: 'Errore: '+error});

            if(!extraFounded) return res.status(404).send({message: 'Errore durante il procedimento'});

            return res.status(200).send({extra : extraFounded});
        });
    },


    update: function(req,res){
        let id = "656efe62f0686e616d129c0d";
        let params = req.body;

        Extra.findByIdAndUpdate(id, params.data, (error,extraUpdated)=>{
            if(error) return res.status(500).send({message: 'Errore: '+error});

            if(!extraUpdated) return res.status(404).send({message: 'Errore durante il procedimento'});

            return res.status(200).send({extra : extraUpdated});
        })
    },



    update_year: function(req,res){
        let id = "656efe62f0686e616d129c0d";
        let year = req.params.year;
        Extra.findByIdAndUpdate(id, {current_year : year}, (error,extraUpdated)=>{
            if(error) return res.status(500).send({message: 'Errore: '+error});

            if(!extraUpdated) return res.status(404).send({message: 'Errore durante il procedimento'});

            return res.status(200).send({message : `Nuovo anno ${year} iniziato!!`});
        })
    },



    images: function(req,res){
        let image = req.params.image;
        let image_path = './uploads/assets/'+image;
        return res.sendFile(path.resolve(image_path));
    },



    contact: function(req,res){
        let params = req.body;
        let transport = email.transport;

        const message = {
            from : params.email,
            to : env.email,
            subject : params.object,
            html : params.message
        }

        transport.sendMail(message, function(error,info){
            let message = {
                status : "error",
                text : "Error sending the email"
            }
         
            if(!error){
                message = {
                    status : "success",
                    text : ""
                }
            }
            return res.status(200).send({message});
        })
    }



}



module.exports = controller;