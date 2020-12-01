const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const router = require('./routes/router.js');
const MongoClient = require('mongodb').MongoClient;
const mongourl = 'mongodb://localhost:27027/';

const app = express();
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

MongoClient.connect(mongourl,(error,db)=>{
    if(error) throw error;

    app.get('/',(request,response)=>{
        response.send('');
    });

    app.use((request,response,next)=>{
        //connecting collection
        next();
    });

    app.use(bodyParser.urlencoded({  extended:true   }));
    app.use(cookieParser());
    app.use(session({secret:'some secret text...'}));
    app.use(router);
    app.listen(3003,()=>console.log('listening to port 3003'));
});