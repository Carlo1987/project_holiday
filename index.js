const mongoose = require('mongoose');
const app = require('./app');
const https = require('https');
const fs = require('fs');

const env = require('./env');
const port = env.database.port;
const host_database = env.database.host;
const database = env.database.database;

const options = {
  key: fs.readFileSync('./ssl/privkey.pem'),
  cert: fs.readFileSync('./ssl/fullchain.pem')
};

mongoose.Promise = global.Promise;
mongoose.set("strictQuery",false);

mongoose.connect(`mongodb://${host_database}/${database}`)
        .then(()=>{
            console.log(`collegamento al database -${database}- di Mongo riuscito`);
        
          ////////   CREAZIONE  SERVER  //////

          const server = https.createServer(options,app);
          server.listen(port, ()=> { console.log('Server https attivo nella porta '+port);  });

        })
        .catch(error => console.log('trovato il seguente errore: '+error));