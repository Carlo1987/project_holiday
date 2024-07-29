
const User = require('../models/user');           //////  MODELS  ///////
const bcryptjs = require('bcryptjs');             //////  CRIPTARE PASSWORD  //////
const jwt = require('../jwt/create_jwt');         /////  Json Web Token
const email = require('../emails/emails');        /////  EMAILS  //////////

const env = require('../env');


//////  PROPRIETA' FILES  ///////
const fs = require('fs');
const path = require('path');
const { emit } = require('process');


/////  MESSAGGI GENERALI  //////

const general_error_message = 'Errore durante il procedimento: ';
const no_found_User = "User not found";

/////////////////////////////////
////////////////////////////////
////////////////////////////////

const UserController = {

    save: function (req,res){
        let dates = req.body;

         User.findOne({email : dates.email}, async function(error,emailChecked){
            if(error) return res.status(200).send({message: general_error_message+error});

               ///   se trova un utente nel database già registrato, il client mi darà un messaggio di errore
            if(emailChecked && emailChecked.id_noLogin == '' 
                || emailChecked && emailChecked.id_noLogin != '' && emailChecked.name != dates.name 
                || emailChecked && emailChecked.id_noLogin != '' && emailChecked.surname != dates.surname){                         
                return res.status(200).send({message: "checked"});
            } 

            let hash = await bcryptjs.hash(dates.password , 10);           //   password criptata

            if(!emailChecked){                                        //    se non trova nessun utente nel database, lo salva e registra normalmente

                let user = new User();
             
                user.id_noLogin = '';
                user.name = dates.name;
                user.surname = dates.surname;
                user.email = dates.email;
                user.cell = dates.cell;
                user.password = hash;
                user.status = env.starting_role;
                user.image = "user_default.png"
                user.country = dates.country,
                user.image_path = '';
                user.address = dates.address,
                user.city = dates.city,
                user.cap = dates.cap
        
                user.save((error , userSaved)=>{
                    const message_error = "Errore durante il salvataggio ";
        
                    if(error) return res.status(200).send({message: message_error+error});
        
                    if(!userSaved) return res.status(404).send({message: no_found_User})
        
                    return res.status(200).send({user: userSaved})
                }) 


 //   se trova un utente nel database che però non era registrato, aggiorna i dati rendendolo un utente registrato
            }else if(emailChecked && emailChecked.id_noLogin != '' && emailChecked.name == dates.name && emailChecked.surname == dates.surname){ 

                let params = {
                    id_noLogin : '',
                    cell : dates.cell,
                    password : hash,
                    image_path : '',
                    country : dates.country,
                    address : dates.address,
                    city : dates.city,
                    cap : dates.cap
                }

                User.findByIdAndUpdate(emailChecked._id , params , {new:true} , (err,userSaved)=>{
                    if(err)   return res.status(200).send({message:general_error_message});
                    if(!userSaved)   return res.status(200).send({message:no_found_User});

                    return res.status(200).send({user: userSaved });       
                
                })
            }
                
        })        
    },



    getUser_noLogin: function(req,res){

        let dates = req.body;

        let search = {
            name : dates.name,
            surname : dates.surname,
            email : dates.email
        }

        User.findOne(search, (err,userFounded)=>{
            if(err) return res.status(200).send({message : no_found_User}); 

            if(!userFounded){

                let user = new User();

                user.id_noLogin = dates._id;
                user.name = dates.name;
                user.surname = dates.surname;
                user.email = dates.email;
                user.cell = dates.cell;
                user.password = '';
                user.status = env.starting_role;
                user.image = "user_default.png",
                user.image_path = '';
                user.address = dates.address,
                user.city = dates.city,
                user.cap = dates.cap
        
                user.save(function(err,userSaved){
                    
                    if(err) return res.status(500).send({message: message_error+error});
                    if(!userSaved) return res.status(404).send({message: no_found_User});
                    return res.status(200).send({user: userSaved});
                });

            }else{
                return res.status(200).send({ user : userFounded}); 
            }
        
        });

    },



    uploadImage: function(req,res){
        let id = req.params.id;
        let file = req.files;

        if(file){

        let file_path = file.image.path;
        let type = file.image.type;
        // let file_name = file_path.split('\\');
        let file_name = file_path.split('/');
        file_name = file_name[2]; 
      
        if(type == 'image/jpeg' || type == 'image/jpg' || type == 'image/png' || type == 'image/gif' || type == 'image/webp'){

            User.findById(id, function(error,user){
                if(error) return res.status(500).send({message: general_error_message+error});

                if(user){
                    let user_imagePath = user.image_path;

                    let data = {
                        image : file_name,
                        image_path : file_path
                    }

               
        
                    User.findByIdAndUpdate(id, data, {new:true} , (error,userUpdated)=>{
                        if(error){
                            fs.unlink(file_path, ()=>{ return res.status(500).send({message: general_error_message+error}); })
                        } 
        
                        if(!userUpdated){
                            fs.unlink(file_path, ()=>{ return res.status(404).send({message: "File not found"}); })
                        } else{

                            if(user_imagePath != ''){
                                fs.unlink(user_imagePath, ()=>{    return  res.status(200).send(userUpdated); });  
                            }else{
                                return  res.status(200).send(userUpdated);   
                            }   
                          
                        }
                    })

                }else{                                //   se non trova l'utente
                    return res.status(404).send({message: no_found_User});
                }
               
            })
        }else{                                                     //  se il file non è di tipo immagine
            fs.unlink(file_path, ()=>{
                return res.status(200).send({message: 'File not suported'});
            }) 
        }  
       }else{                                                       //    se la req.files == null
        return res.status(404).send({message: general_error_message})
      }  
    },



    getUser: function(req,res){
        let id = req.params.id;

        User.findById(id , function(error,UserFounded){
            if(error) return res.status(200).send({message: general_error_message+error});

            if(!UserFounded) return res.status(200).send({message: no_found_User});

            return res.status(200).send({user: UserFounded});
        })
    },




    update: function(req,res){
         let id = req.params.id;
         if(id != req.user.sub)   return res.status(200).send({ message:'Invalid User'});
        
         let data = req.body;

         User.findOne({email : data.email}, {new:true}, (error,userChecked)=>{
            if(error) return res.status(500).send({ message: "Errore durante la modifica dei dati"});

            if(userChecked && id != userChecked._id){
                return res.status(200).send({ message: 'checked'});
            }else{
                
                let update = {
                    name : data.name,
                    surname : data.surname,
                    email : data.email,
                    cell : data.cell,
                    country : data.country,
                    address : data.address,
                    city : data.city,
                    cap : data.cap
                 }
        
                 User.findByIdAndUpdate(id, update, {new:true}, (error,userUpdated)=>{
                    if(error) return res.status(500).send({ message: "Errore durante la modifica dei dati"});
        
                    if(!userUpdated) return res.status(404).send({ message: no_found_User});
        
                    return res.status(200).send({ user: userUpdated});
                 }) 
            }
         })

     
    },



    updatePassword: function(req,res){
        let id = req.params.id;
        let old_password = req.body.old_password;
        let new_password = req.body.new_password;

        User.findById(id , async (error,userFounded)=>{
            if(error) return res.status(500).send({message: general_error_message+error});

            if(userFounded){
                let checkPassword = bcryptjs.compareSync(old_password, userFounded.password);  

                if(checkPassword){
                    let hash = await bcryptjs.hash(new_password , 10);           //   password criptata
        
                    User.findByIdAndUpdate(id , {password:hash} , {new:true} , (error, passwordUpdated)=>{
                        if(error) return res.status(500).send({message:general_error_message+error});

                        if(!passwordUpdated) return res.status(200).send({message: general_error_message+error});

                        return res.status(200).send({ update: true })
                    })

                }else{                         //   se la vecchia password è sbagliata
                    return res.status(200).send({ update: false })
                }

               

            }else{                              //  se non trova l'utente
                return res.status(404).send({message: no_found_User});
            } 
        })

      
    },



    login: function(req,res){
 
        let params = req.body;
        let email = params.user.email;
        let password = params.user.password;

        User.findOne({email : email} ,  function(error,userFounded){
            if(error) return res.status(500).send({message: general_error_message+error});

            if(!userFounded || userFounded && userFounded.id_noLogin != '') return res.status(200).send({ status : false , message: 'noFound' });

            if(userFounded){

                let matchPassword = bcryptjs.compareSync(password , userFounded.password);

                if(!matchPassword){
                    return res.status(200).send({ status : false , message: 'wrong_pass'});

                }else{          
            
                    if(params.getToken == null || params.getToken == undefined){
                        return res.status(200).send({
                            status : true,
                            token : jwt(userFounded)
                        });
                    }else{
                        return res.status(200).send({
                            status : true,
                            user: userFounded,
                            session: true,  
                        });
                    }  
                }
            }
        }) 
    },



    delete: function(req,res){
        let id = req.params.id;

        let id_noLogin = "NOLOGIN";
        for(let i=0; i<12; i++){
            id_noLogin += Math.round(Math.random()*9);
        }



        let params = {
            id_noLogin : id_noLogin,
            password : '',
            image : "user_default.png",
        }

        User.findByIdAndUpdate(id , params , {new:true} , (error,userDeleted)=>{
            if(error) return res.status(500).send({message: general_error_message+error});

            if(!userDeleted){
                return res.status(404).send({message: no_found_User});
            }else{

                if(userDeleted.image_path != ''){
                    fs.unlink(userDeleted.image_path, ()=>{
                        return res.status(200).send({user: userDeleted});
                    })
                }else{
                    return res.status(200).send({user: userDeleted});
                }
            }
        })
    },



    getImage: function(req,res){
        let image = req.params.image;
        let image_path = './uploads/users/'+image;
        return res.sendFile(path.resolve(image_path));
    },



    sendToken: function(req,res){
        let params = req.body;
        User.findOne({email: params.email}, {email:true}, function(error,userFounded){
            if(error) return res.status(200).send({message: general_error_message+error});

            if(userFounded){
                let token = '';
                for(let i=0; i<6; i++){
                    token += Math.round(Math.random()*9);
                }

                let transport = email.transport;

                let message = {
                    from : email.email_server,                                                  
                    to : userFounded.email,                                                                   
                    subject : email.sendToken(token, params.lang).title,                        
                    html : email.sendToken(token, params.lang).email
                }    
                
                transport.sendMail(message , async function(error,info){
                    if(error) return res.status(200).send({message: general_error_message+error});

                    let token_hash = await bcryptjs.hash(token , 10);  
                    return res.status(200).send({ token:token_hash,
                                                  user: userFounded
                                               });
                })
           
            }else{
                return res.status(200).send({message: email.sendToken('00000', params.lang).no_found});
            } 
        })
      },



      verifyToken: function(req,res){
        let params = req.body;
        let verify = bcryptjs.compareSync(params.token , params.hash);

        res.status(200).send({verify : verify});
      },



      resetPassword: async function(req,res){
        let id = req.params.id;
        let password = req.body.password;
        let hash = await bcryptjs.hash(password , 10); 

        User.findByIdAndUpdate(id, {password : hash}, function(error,userUpdated){
            if(error) return res.status(500).send({message: general_error_message+error});

            if(!userUpdated){
                return res.status(404).send({message: no_found_User});

            }else{
               let language = req.body.lang;
                let transport = email.transport;

                let message = {
                    from : email.email_server,                                                  
                    to : userUpdated.email,                                                                   
                    subject : email.resetPassword(userUpdated.name, language).title,                       
                    html : email.resetPassword(userUpdated.name, language).email
                }  

                transport.sendMail(message,(error,info)=>{
                    if(error) return res.status(500).send({message: general_error_message+error});

                    return res.status(200).send({ message: email.resetPassword(userUpdated.name, language).success,
                    user: userUpdated });
                })
            }
        })
      },



      editRole: function(req,res){
        let params = req.body;

        User.findOne({email:params.data.email}, (error, userFounded)=>{
            if(error) return res.status(500).send({message: general_error_message+error});

            if(!userFounded){
               return res.status(200).send({message: no_found_User});
            }else{
                User.findByIdAndUpdate(userFounded._id , {status:params.data.role} , (error,userUpdated)=>{
                    if(error) return res.status(500).send({message: general_error_message+error});

                    if(!userUpdated) return res.status(404).send({message: no_found_User});

                    return res.status(200).send({user : userUpdated});
                })
                
            }
        })
      },






    
}


module.exports = UserController;