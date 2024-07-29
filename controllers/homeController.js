const Home = require('../models/home');                     
const Review = require('../models/review');
const Reserve = require('../models/reserve');
const new_calendary = require('../models/newYear_reserve_calendary');

const fs = require('fs');
const path = require('path');


const general_error_message = 'Errore durante il procedimento: ';
const not_found = 'Casa non trovata';

let controller = {

    save: function(req,res){
        let params = req.body.data;
        let total_guests = params.beds.single_beds+(params.beds.doble_beds*2)+params.beds.sofa_beds+params.beds.forniture_beds+(params.beds.bunk_beds*2);
        let home = new Home();
            home.name = params.name,
            home.city = params.city,
            home.address = params.address,
            home.cap = params.cap,
            home.avatar = 'home.png',
            home.meters = params.meters,
            home.rooms = params.rooms,
            home.beds = params.beds,
            home.guests = total_guests,
            home.baths = params.baths,
            home.description = params.description,
            home.images = [],
            home.details = params.details;
            home.calendary_prices = params.calendary_prices;
           
       home.save((error,homeSaved)=>{
            if(error) return res.status(500).send({message: general_error_message});
            if(!homeSaved) return res.status(200).send({message: 'Errore durante il salvataggio'});
            return res.status(200).send({home : homeSaved});
        });  
    },



    avatarHome: function(req,res){
        let id = req.params.id;
        let file = req.files;
        const message_error_type = "Attenzione: l'immagine di sfondo ha un formato non supportato";
 
        if(file){
            let path_file = file.avatar.path;
            let type_file = file.avatar.type;
           
            // let path_fileSplit = path_file.split('\\');
            let path_fileSplit = path_file.split('/');
            let name_file = path_fileSplit[3];
         
            if(type_file == 'image/jpeg' || type_file == 'image/jpg' || type_file == 'image/png' || type_file == 'image/webp' || type_file == 'image/gif'){

                Home.findById(id, (error,homeFounded)=>{
                    if(error) return res.status(500).send({message:general_error_message});
                    
                    if(!homeFounded){
                        res.status(404).send({message:'Casa non trovata'});

                    }else{
                        let avatar_name = homeFounded.avatar;
                        Home.findByIdAndUpdate(id, {avatar:name_file}, {new:true}, (error, avatarUpdated)=>{
                            if(error) return res.status(500).send({message: general_error_message});
        
                            if(!avatarUpdated) return res.status(404).send({message: general_error_message});
        
                            if(avatar_name != 'home.png'){
                                fs.unlink('./uploads/homes/avatars/'+avatar_name, ()=>{  return res.status(200).send({avatar: avatarUpdated});  })
                            }else{
                                return res.status(200).send({avatar: avatarUpdated});
                            }
                        })
                    }
                })
            }else{                          //  se il formato del file è sbagliato
                fs.unlink(path_file,()=>{
                    return res.status(200).send(message_error_type);
                }) 
            } 
        }else{
            return res.status(500).send("Non hai inserito un'immagine di sfondo");
        }
    },



    imagesHome: function(req,res){
        let id = req.params.id;
        let file = req.files;

        if(file){
            let path_file = file.images.path;
            let type_file = file.images.type;

            // let path_fileSplit = path_file.split('\\');
            let path_fileSplit = path_file.split('/');
            let file_name = path_fileSplit[3];

            if(type_file == 'image/jpeg' || type_file == 'image/jpg' || type_file == 'image/png' || type_file == 'image/webp' || type_file == 'image/gif'){

                Home.findByIdAndUpdate(id, {$push:{images:file_name}}, {new:true}, (error, imageUpdated)=>{
                    if(error) return res.status(500).send({message: general_error_message});

                    if(!imageUpdated) return res.status(404).send({message: general_error_message});

                    return res.status(200).send({image: imageUpdated});
                });
            }else{
                fs.unlink(path_file,()=>{
                    res.status(200).send('Attenzione: qualche immagine aveva un formato non supportato');
                })
            }
        }else{
                return res.status(200).send("Non hai inserito nessuna immagine");
        }
    },



    getHomes: function(req,res){
        Home.find(function(error,homes){
            if(error) return res.status(500).send({message:general_error_message});

            if(!homes) return res.status(404).send({message: "Non ci sono case in archivio"});

            return res.status(200).send({homes : homes});
        })
    },



    getSingleHome: function(req,res){
        let id = req.params.id;

        Home.findById(id, (error,homeFounded)=>{
            if(error) return res.status(500).send({message:general_error_message});

            if(!homeFounded){
                return res.status(404).send({message:not_found});
            
            }else{
                Home.find(function(error,homes){
                    return res.status(200).send({home : homeFounded , homes_length : homes.length});
                })
            }
        })
    },



    update_datasHome: function(req,res){
        let id = req.params.id;
        let params = req.body.data;
        let total_guests = params.beds.single_beds+(params.beds.doble_beds*2)+params.beds.sofa_beds+params.beds.forniture_beds+(params.beds.bunk_beds*2);
        let data = {
            name : params.name,
            city : params.city,
            address : params.address,
            cap : params.cap,
            meters : params.meters,
            rooms : params.rooms,
            beds : params.beds,
            guests : total_guests,
            baths : params.baths,
            description : params.description
        }

        Home.findByIdAndUpdate(id, data, (error,homeUpdated)=>{
            if(error) return res.status(500).send({message:general_error_message});

            if(!homeUpdated) return res.status(404).send({message:not_found});

            return res.status(200).send({home : homeUpdated});
        })
    },



    update_detailsHome: function(req,res){
        let id = req.params.id;
        let params = req.body.data;
       
        Home.findByIdAndUpdate(id, {details : params.details}, (error,detailsUpdated)=>{
            if(error) return res.status(500).send({message:general_error_message});

            if(!detailsUpdated) return res.status(404).send({message:not_found});

            return res.status(200).send({home : detailsUpdated,
                                         message : "Dettagli casa aggiornati"});
        })
    },



    update_pricesHome: function(req,res){
        let id = req.params.id;
        let params = req.body.data;
       
        Home.findByIdAndUpdate(id, {calendary_prices : params.calendary_prices}, (error,pricesUpdated)=>{
            if(error) return res.status(500).send({message:general_error_message});

            if(!pricesUpdated) return res.status(404).send({message:not_found});

            return res.status(200).send({home : pricesUpdated,
                                         message : "Prezzi aggiornati"});
        })
    },



    getAvatar: function(req,res){
        let image = req.params.image;
        let path_image = "./uploads/homes/avatars/"+image;
        return res.sendFile(path.resolve(path_image));
    },



    getImage: function(req,res){
        let image = req.params.image;
        let path_image = "./uploads/homes/images/"+image;
        return res.sendFile(path.resolve(path_image));
    },



    deleteImage: function(req,res){
        let id = req.params.id;
        let image_name = req.params.image;

        Home.findByIdAndUpdate(id , {$pull:{images:image_name}}, (error,homeUpdated)=>{
            if(error) return res.status(500).send({message:general_error_message});

            if(!homeUpdated){
                return res.status(404).send({message:not_found});
            }else{
                fs.unlink('./uploads/homes/images/'+image_name, ()=>{
                    return res.status(200).send({home:homeUpdated});
                })
            }
        })
    },



    deleteHome: function(req,res){
        let id = req.params.id;

        Home.findById(id, (error,homeFounded)=>{
            if(error) return res.status(500).send({message:general_error_message});
            if(!homeFounded){
               return res.status(404).send({message:not_found});
            }else{
                let avatar = homeFounded.avatar;
                let images = homeFounded.images;
               
                Home.findByIdAndRemove(id, (error, homeDeleted)=>{
                    if(error) return res.status(500).send({message:general_error_message});
                    if(!homeDeleted){
                       return res.status(404).send({message:not_found});
                    }else{
                        let message_avatar = '';
                        let message_images = '';
                        if(avatar != 'home.png'){
                            fs.unlink('./uploads/homes/avatars/'+avatar, ()=>{ message_avatar = 'Avatar cancellato'});
                        }
                        if(images.length >= 1){
                            for(let i=0; i<images.length; i++){
                                fs.unlink('./uploads/homes/images/'+images[i], ()=>{ message_images = `Immagini eliminate`});
                            }
                        }
                      
                        let reviews_message = "";
                        Review.deleteMany({home_id : homeDeleted._id}, (error,reviews)=>{
                            if(error) return res.status(500).send({message:general_error_message});
                            if(reviews){
                                reviews_message = "recensioni eliminate";
                            }
                        }) 

                        let reserves_message = "";
                        Reserve.deleteMany({home_id : homeDeleted._id}, (error,reserves)=>{
                            if(error)  return res.status(500).send({message:general_error_message});
                            if(reserves){
                                reserves_message = "prenotazioni eliminate";
                            }
                        }) 

                        return res.status(200).send({home_deleted: homeDeleted,
                            avatar: message_avatar,
                            images:message_images,
                            reviews:reviews_message,
                            reserves:reserves_message});
                       
                    }
                })
            }
        })
    },


    update_price_newYear: function(req,res){
        let id = req.params.id;
        let params = req.body;
      
        Home.findById(id, (error,homeFounded)=>{
            if(error) return res.status(500).send({message:general_error_message+error});
            if(!homeFounded){
               return  res.status(404).send({message:not_found});
            }else{
            
               let update_calendary = {
                  prices: {
                     current_year : params.calendary_prices.prices.next_year,     //   i prezzi "dell'anno corrente" vengono copiati "dall'anno succesivo"
                     next_year :  params.calendary_prices.prices.next_year        //   i prezzi "dell'anno successivo" rimangono uguali
                  },
                  reserves: {
                    current_year : params.calendary_prices.reserves.next_year,    //    le prenotazioni "nell'anno corrente" vengono copiate "dall'anno successivo"
                    next_year :  new_calendary                                    //   le prenotazioni "dell'anno successivo" si azzerano
                  }
               }

               Home.findByIdAndUpdate(homeFounded._id, {calendary_prices : update_calendary}, (error,homeUpdated)=>{
                if(error) return res.status(500).send({message:general_error_message+error});
                if(!homeUpdated) return  res.status(404).send({message:not_found});
                return res.status(200).send({message: `calendario ${homeUpdated.name} aggiornato!!`})
               })
              
            }
         
        }) 
    }








}


module.exports = controller;


