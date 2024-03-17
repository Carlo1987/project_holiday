const mongoose = require('mongoose');
const app = require('./app');
const host = "127.0.0.1"                                                      
const numeroHost = "27017";   
const database = "progetto_vacanze";
const port = 3700;

mongoose.Promise = global.Promise;
mongoose.set("strictQuery",false);

mongoose.connect(`mongodb://${host}:${numeroHost}/${database}`)
        .then(()=>{
            console.log(`collegamento al database -${database}- di Mongo riuscito`);
        
          ////////   CREAZIONE  SERVER  //////

           app.listen(port, ()=>{
            console.log('server attivo nella url: localhost:'+port);
          }) 
        
        })
        .catch(error => console.log('trovato il seguente errore: '+error));