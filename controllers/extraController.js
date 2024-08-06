const Extra = require('../models/extra');
const env = require('../env');
const path = require('path');
let email = require('../emails/emails');

const error_500 = "Error during the procedure: ";
const error_404 = " not found";


let controller = {

    getExtra: function(req,res){

       Extra.find(function(error,extraFounded){
        if(error) return res.status(500).send({message: error_500+error});

        if(!extraFounded) return res.status(404).send({message: 'Extra'+error_404});

        if(extraFounded.length == 0){
            let extra = new Extra();

            extra.current_year =  new Date().getFullYear();
            extra.reserve_days = {
              min : 4,
              max: 25
            };
            extra.hours = {
              checkIn : {
                start : 18,
                end : 21
              },
              checkOut : {
                start : 7,
                end : 11
              }
            };
            extra.limit_mounthReserve = 9;
            extra.discount = {
              days_discount : 20,
              value_discount : 10
            };
            extra.advance = 30;
            extra.refund = {
              mode : 'moderate',
              days : 5,
              limit : "",
              date : "",
              hour : "",
              value : 0
            };
            extra.clean = 50;

            extra.save(function(error,extraSaved){
                if(error)   return res.status(500).send({message:error_500+error});
                if(!extraSaved)   return res.status(404).send({message:'Extra_Saved'+error_404});

                return res.status(200).send({ extra : extraSaved});
            })
          
        }else{
            Extra.findOne(function(error,extraFounded){
                if(error) return res.status(500).send({message: error_500+error});

                if(!extraFounded) return res.status(404).send({message: 'Extra_Founded'+error_404});
    
                return res.status(200).send({extra : extraFounded});
            })
        }
       })
    },


    update: function(req,res){
        let params = req.body;

        Extra.updateOne(params.data, (error,extraUpdated)=>{
            if(error) return res.status(500).send({message: error_500+error});

            if(!extraUpdated) return res.status(404).send({message: 'Extra_Updated'+error_404});

            return res.status(200).send({extra : extraUpdated});
        })
    },



    update_year: function(req,res){

        let year = req.params.year;

        Extra.updateOne({current_year : year}, (error,extraUpdated)=>{
            if(error) return res.status(500).send({message:  error_500+error});

            if(!extraUpdated) return res.status(404).send({message: 'Update_Year'+error_404});

            return res.status(200).send({message : `New year ${year} arrived!!`});
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

        let html = `
        <h4> Messaggio ricevuto da: <strong> ${params.email} </strong> </h4>
        <hr>
        <h4> Testo messaggio: </h4>
        <p> ${params.message} </p>
        `;

        const message = {
            from : env.host_email,
            to : env.email,
            subject : params.object,
            html : html
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