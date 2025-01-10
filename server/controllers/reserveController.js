const Reserve = require('../models/reserve');
const Home = require('../models/home');
let email = require('../emails/emails');


const env = require('../env');

const message_error = "Errore durante il procedimento: ";
const noFound_reserve = "Prenotazione non trovata";

let controller = {

  save: function(req,res){

       let params = req.body.reserve;
 
        let reserve = new Reserve();

        reserve.home_id = params.home_id;
        reserve.user_data = params.user_data;
        reserve.date_reserve = params.date_reserve;
        reserve.checkIn = params.checkIn;
        reserve.checkOut = params.checkOut;
        reserve.total_nights = params.total_nights;
        reserve.guests = params.guests; 
        reserve.clean = params.clean;
        reserve.discount = params.discount;
        reserve.advance = params.advance;
        reserve.refund = params.refund;
        reserve.cost = params.cost;
        reserve.payment = params.payment;
        reserve.status = "prenotata";

       
         reserve.save(function(error,reserveSaved){
            if(error) return res.status(500).send({message: message_error+error});

            if(!reserveSaved){
                return res.status(404).send({message : "Errore durante il salvataggio"});
            }else{

                ////    invio email

                let language = req.body.lang;

                let transport = email.transport;

                const message = {
                    from : email.email_server,
                    to : reserveSaved.user_data.email,
                    subject : `${email.reserve(params, reserveSaved._id ,language).object} ${params.home_data.name}`,
                    html : email.reserve(params, reserveSaved._id , language).email
                }

                transport.sendMail(message, function(error,info){
                    if(error)  return res.status(500).send({message:message_error+error});
                })

                ////    aggiorno calendario prenotazioni della casa

                let data = {
                    calendary_prices: {
                        prices: {
                            current_year : params.home_calendary.prices.current_year, 
                            next_year : params.home_calendary.prices.next_year
                        },
                        reserves: {
                            current_year : params.home_calendary.reserves.current_year, 
                            next_year : params.home_calendary.reserves.next_year 
                        }
                    }
                }

                Home.findByIdAndUpdate(reserveSaved.home_id, data, (error,homeUpdated)=>{
                    if(error) return res.status(500).send({message: message_error+error});

                    if(!homeUpdated){
                        res.status(404).send({message:"Casa non trovata"});
                    }else{
                        return res.status(200).send({reserve : reserveSaved,
                                                     home: homeUpdated});
                    }
                })
            }
        })   
    },



    completeReserve: function(req,res){
        let id = req.params.id;
        let data = req.body.reserve;

        Reserve.findByIdAndUpdate(id, data, (error,reserveUpdated)=>{
            if(error)   return res.status(500).send({message:message_error+error});
            if(!reserveUpdated){
                return res.status(404).send({message:noFound_reserve});
            }else{
                let language = req.body.lang;
                let transport = email.transport;

                let message = {
                    from: email.email_server,
                    to: reserveUpdated.user_data.email,
                    subject: email.completePayment(reserveUpdated, language).object,
                    html: email.completePayment(reserveUpdated, language).email
                }

                transport.sendMail(message, (err,info)=>{
                    if(err)   return res.status(200).send({message : err});
                });

                return res.status(200).send({reserve:reserveUpdated});
            } 
            
        }) 
    },



    getReserves: function(req,res){
        Reserve.find(function(error,reservesFounded){
            if(error)   return res.status(500).send({message: message_error+error});
            if(!reservesFounded){
                return res.status(404).send({message: "Nessuna prenotazione trovata"});
            }else{
                return res.status(200).send(reservesFounded);
            }   
        })
    },




    getReserve: function(req,res){
        let id = req.params.id;

        Reserve.findById(id, (error,reserveFounded)=>{
            if(error)  return res.status(200).send({message: message_error+error});
            if(!reserveFounded)  return res.status(200).send({message: noFound_reserve});
            return  res.status(200).send({reserve:reserveFounded});
        })
    },



    getReserve_byUser: function(req,res){
        let id = req.params.id;

        Reserve.find({'user_data._id':id}, (error,reservesFounded)=>{
            if(error)  return res.status(500).send({message: message_error+error});
            if(!reservesFounded){
                return res.status(404).send({message: noFound_reserve});
            }else{
                return  res.status(200).send({reserve : reservesFounded});
            }
           
        }).sort({checkIn:-1});
    },



    getReserve_byHome: function(req,res){
        let params = req.body.data;

        Reserve.find({'home_id':params.home_id } , (error,reserveFounded)=>{
            if(error)  return res.status(500).send({message:message_error+error});

            if(!reserveFounded){
                return res.status(404).send({message : noFound_reserve});
            }else{
                let result = [];
                let date = `${params.year}-${params.mounth}`;

                reserveFounded.map(reserve=>{
                    if(reserve.checkIn.includes(date)){
                        result.push(reserve);
                    }
                })

                return res.status(200).send(result);
            }
        }).sort({checkIn:-1});
    },




    refund: function(req,res){
        let id = req.params.id;
        let params = req.body;
        let date = new Date();

        let data = {
            status : "annullata",
            "refund.date" : `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
            "refund.hour" : `${date.getHours()}:${date.getMinutes()}`,
            "refund.value" : params.refund_value 
        }

        Reserve.findByIdAndUpdate(id, data , (error,reserveFounded)=>{
         if(error)  return res.status(500).send({message: message_error+error});
            if(!reserveFounded){
                return res.status(404).send({message: noFound_reserve});
            }else{

                let language = params.lang;
                let transport = email.transport;

                let message = {
                    from: email.email_server,
                    to: reserveFounded.user_data.email,
                    subject: email.refund_cancelled(reserveFounded, params.total_refund, language).object,
                    html: email.refund_cancelled(reserveFounded, params.total_refund, language).email
                }

                Home.findByIdAndUpdate(reserveFounded.home_id, {calendary_prices:params.calendary_home}, (error,homeFounded)=>{
                    if(error)  return res.status(500).send({message:message_error+error});
                    if(!homeFounded){
                        return res.status(404).send({message:"Home not found"});
                    }else{
                        transport.sendMail(message);
                        return res.send({reserve:reserveFounded, home:homeFounded})
                    }
                })
            }
        })
    }


    
}


module.exports = controller;