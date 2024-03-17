const Extra = require('../models/extra');
const path = require('path');

let controller = {


    changeLanguage: function(req,res){
        let id = "656efe62f0686e616d129c0d";
        let language = req.params.language;

         Extra.findByIdAndUpdate(id, {language : language}, (error,extraUpdated)=>{
            if(error) return res.status(500).send({message: 'Errore: '+error});

            if(!extraUpdated) return res.status(404).send({message: 'Errore durante il procedimento'});

            return res.status(200).send({message : language});
        }) 
    }, 


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

        Extra.findByIdAndUpdate(id, params, (error,extraUpdated)=>{
            if(error) return res.status(500).send({message: 'Errore: '+error});

            if(!extraUpdated) return res.status(200).send({message: 'Errore durante il procedimento'});

            return res.status(200).send({extra : extraUpdated});
        })
    },



    update_year: function(req,res){
        let id = "656efe62f0686e616d129c0d";
        let year = req.params.year;
        Extra.findByIdAndUpdate(id, {current_year : year}, (error,extraUpdated)=>{
            if(error) return res.status(500).send({message: 'Errore: '+error});

            if(!extraUpdated) return res.status(200).send({message: 'Errore durante il procedimento'});

            return res.status(200).send({message : `Nuovo anno ${year} iniziato!!`});
        })
    },



    images: function(req,res){
        let image = req.params.image;
        let image_path = './uploads/assets/'+image;
        return res.sendFile(path.resolve(image_path));
      }



}



module.exports = controller;