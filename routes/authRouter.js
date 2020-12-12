const { request } = require('express');
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

///login///

router.get('/',(request,response)=>{
    if(request.session.username){
        response.render('status',{status:`welcome '${request.session.username}', let's <a href='/home'>buy</a> some pizza<br><a href='/auth/out'>log out</a>`});
    }
    else{
        response.render('user_login');
    }
});

router.post('/status',(request,response)=>{
    const username = request.body.username;
    const password = request.body.password;

        User.findOne({username:username},'username password',(err,foundres)=>{
            if(err) throw err;
                if(foundres){
                    if(foundres.password == password){
                        request.session.username = username;
                        response.render('status',{status:`welcome '${request.session.username}', let's <a href='/home'>buy</a> some pizza<br><a href='/auth/out'>log out</a>`});
                    }
                    else{
                        response.render('status',{status:`password for username '${username}' is not correct, please <a href='/auth'>login</a> again`});
                    }
                }
                else{
                    response.render('status',{status:`'${username}' doesn't exist in database, you can <a href='/auth/regist'>register</a> with this username`});
                }
        });
});

///log out///

router.get('/out',(request,response)=>{
    request.session.username = null;
    response.render('status',{status:`you are successfully logged out`})
});

//registration///

router.get('/regist',(request,response)=>{
    response.render('user_regist');
});

router.post('/regist/status',(request,response)=>{
    const username = request.body.username;
    const password = request.body.password;
    const address = request.body.address;
    const phone_number = request.body.phone_number;
    const current_user = new User({username:username,password:password,address:address,phone_number:phone_number});

        User.findOne({username:username},'username',(error,foundres)=>{
            if(error) throw error;
                if(foundres){
                    response.render('status',{status:`name '${username}' already exists in database, please <a href='/auth/regist'>register</a> again`});
                }
                else{
                    current_user.save((err)=>{
                        if(err){
                            response.render('status',{status:`invalid input format, please <a href='/auth/regist'>register</a> again`});
                        }
                        else{
                            response.render('status',{status:`name '${username}' successfully registered to database, let's <a href='/auth'>login</a>`});
                        }
                    });
                }
        });
});

module.exports = router;