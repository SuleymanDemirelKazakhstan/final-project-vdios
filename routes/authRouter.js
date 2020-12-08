const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

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
                        status = `welcome ${username}`;
                    }
                    else{
                        status = `password for username '${username}' is not correct`;
                    }
                }
                else{
                    status = `username '${username}' doesn't exist in database`;
                }

            response.render('status',{status:status});
        });
});

module.exports = router;