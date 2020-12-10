const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

///login///

router.get('/',(request,response)=>{
    response.render('auth_form');
});

router.post('/status',(request,response)=>{
    const username = request.body.username;
    const password = request.body.password;

        User.findOne({username:username},'username password',(err,foundres)=>{
            if(err) throw err;
            let status;
                if(foundres){
                    if(foundres.password == password){
                        request.session.username = username;
                        status = `welcome '${username}', let's <a href='/home'>buy</a> some pizza`;
                    }
                    else{
                        status = `password for username '${username}' is not correct, please <a href='/auth'>login</a> again`;
                    }
                }
                else{
                    status = `'${username}' doesn't exist in database, you can <a href='/auth/regist'>register</a> with this username`;
                }
            response.render('status',{status:status});
        });
});

//registration///

router.get('/regist',(request,response)=>{
    response.render('regist_form');
});

router.post('/regist/status',(request,response)=>{
    const username = request.body.username;
    const password = request.body.password;
    const currentUser = new User({username:username,password:password});

        User.findOne({username:username},'username',(error,foundres)=>{
            if(error) throw error;

                if(foundres){
                    response.render('status',{status:`name '${username}' already exists in database, please <a href='/auth/regist'>register</a> again`});
                }
                else{
                    currentUser.save((err)=>{
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