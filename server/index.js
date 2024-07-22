const mongoose = require('mongoose');
const app = require('./app');

const env = require('./env');



mongoose.Promise = global.Promise;
mongoose.set("strictQuery",false);

mongoose.connect(`mongodb://${env.database.host}/${env.database.database}`)
        .then(()=>{
            console.log(`collegamento al database -${env.database.database}- di Mongo riuscito`);
        
          ////////   CREAZIONE  SERVER  //////

           app.listen(env.database.port, ()=>{
            console.log('server attivo nella porta '+env.database.port);
          }) 
        
        })
        .catch(error => console.log('trovato il seguente errore: '+error));