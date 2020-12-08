const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const router = require('./routes/router.js');
const mongoose = require('mongoose');
const path = require('path');

const mongourl = 'mongodb://localhost:27017/finalprojectdb';

const app = express();
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');
app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static('public'))

app.get('/',(request,response)=>{
    response.send('main page');
});

mongoose.connect(mongourl,{useNewUrlParser:true,useUnifiedTopology:true},(err,ok)=>{
    if(err) throw err;
    app.listen(3003,()=>console.log('listening...'));
});

app.use(bodyParser.urlencoded({  extended:true   }));
app.use(cookieParser());
app.use(session({secret:'some secret text...'}));
app.use(router);