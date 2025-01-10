# project_holiday

NOME DEL PROGETTO : SardegnaDream

DESCRIZIONE : Simulazione affitto case vacanze in Sardegna dove potrai prenotare vacanze, gestire le prenotazioni e commentare le case, 
              IN PIU' potrai registrarti e sarai un Amministratore in grado di creare e gestire nuove case! 

              Inizialmente non ci saranno case, dovrai quindi registrarti e divertirti a crearle tu ;-)

              PS. la registrazione dura 1 minuto!



----  Quest'applicazione è stata volutamente salvata in modalità sviluppo su Github per permetterti di vedere il codice del frontend Angular  ----




-------------------- PROCEDURA PER COPIARE E USARE APPLICAZIONE SUL PC  ---------------------------

-----------   REQUISITI  -----------

Avere Docker installato



----------  PROCEDURA  ------------

1) clonare il repository di GitHub del progetto nel tuo pc dento una cartella <nome_app>

            git clone https://github.com/Carlo1987/project_holiday.git


2) Crere un file env.js dentro la cartella <nome_app>/server

         
3) dentro il file env.js copiare questo contenuto aggiungengo i tuoi dati email e parola chiave:

--- env.js


const nodemailer = require('nodemailer');


const env = {


    host : 'http://localhost:3700',                  

    secret_key : "<scegli_parola_chiave>",            //   parola chiave per gestire jwt


    database : {                                      //   dati connessione database
        host : "db:27017",                                                        
        database : "holiday",
        port : 3700   
    },


    transport_email :  nodemailer.createTransport({       //  dati uso email                           
        host : "<tuo_server_smtp_email>",                                                              
        port : "<numero_porta>",                                                                
        auth : {                                                                  
              user : "<identificativo_utente>",                                                           
              pass : "<password_utente>"                                                          
        }
       }),


    host_email : "<email_mittente>",                     //  indirizzo per invio email

 
    cell : "<tuo_cellulare>",                      //  numero cellulare, anche uno casuale


    email : "<tua_email_personale>",               //  tua email personale o email casuale            


    starting_role : "admin"                       //   se ci si vuole registrare come Amministratore lasciare così
                                                     (per registrarsi come normale utente cambiare con "client")
}

module.exports = env;



4) Creare immagini e contenitori Docker:
   Stando nella directory principale dell'applicazione, digitare

          docker compose up



5) Aprire applicazione andando tramite browser a

     http://localhost:4200


