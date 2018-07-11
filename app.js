const express = require('express');
const createError = require('http-errors');
const session = require('express-session');
const bodyParser = require('body-parser');
const {rainbow,success,error,radar} = require('handy-log');
const db = require('./config/connection');
const RedisStore = require('connect-redis')(session);
const logger = require('morgan');

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization");
    next();
  });

  app.use(session({
    secret:'SECR*T',
    store: new RedisStore({
      host: 'localhost',
      port: 6379,
      ttl: null,
      db: 0,
      pass: null,
      prefix: 'sess:'
    }),
    cookie: { secure: false },
    resave:false,
    saveUninitialized:true
  }))
  app.use("/", express.static(__dirname + "/public"));
  
require('./routes')(app)

// app.use((req,res,next)=>{
// next(createError(404))
// })

app.use(function(err, req, res, next) {
    console.error(err);
    res.status(500).send({status:500, message: 'internal error', type:'internal'}); 
  })

app.listen(1337,()=>{
    success(`server started in port 1337`)
})