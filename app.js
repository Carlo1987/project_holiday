const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

////  SESSIONI E COOKIES  ///////

const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(session({
    secret: 'Ilbacala',
    resave: true,
    saveUninitialized: true
 }));



////    ARCHIVI ROTTE   //////////

const user_routes = require('./routes/userRoute');
const home_routes = require('./routes/homesRoute');
const review_routes = require('./routes/reviewRoute');
const reserve_routes = require('./routes/reserveRoute');
const extra_routes = require('./routes/extraRoute');

////  MIDDLEWARS  ////////

app.use(bodyParser.urlencoded({extended:false}));   
app.use(bodyParser.json());        //  converte le richieste ajax che arrivano tramite il bodyParser della richiesta stessa in json



////  CORS   //////

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');    
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });


  ///////  ROTTE  ////////////

  app.use('/',express.static('client',{redirect:false}));  

  app.use('/user', user_routes);
  app.use('/home', home_routes);
  app.use('/review', review_routes);
  app.use('/reserve', reserve_routes);
  app.use(extra_routes);

  app.get('*',function(req,res,next){               
    return res.sendFile(path.resolve('client/index.html'));       
  });

  /////  ESPORTARE MODULO  ///////

  module.exports = app;
