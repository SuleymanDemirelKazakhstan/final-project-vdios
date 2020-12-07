const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/',(request,response)=>{
    const template = `
    <form action='/auth/status' method='post'>
    <input type='text' name='username'>
    <input type='password' name='password'>
    <input type='submit'>
    </form>`;
    response.send(template);
});

router.post('/status',(request,response)=>{
    const username = request.body.username;
    const password = request.body.password;

        User.findOne({username:username},'username password',(err,foundres)=>{
            if(err) throw err;

                if(foundres){
                    if(foundres.password == password){
                        request.session.username = username;
                        response.send(`welcome ${username}`);
                    }
                    else{
                        response.send(`password for username '${username}' is not correct`);
                    }
                }
                else{
                    response.send(`username '${username}' doesn't exist in database`);
                }
        });
});

module.exports = router;