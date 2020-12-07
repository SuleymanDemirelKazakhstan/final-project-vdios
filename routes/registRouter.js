const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/',(request,response)=>{
    const template = `
        <form action='/regist/status' method='post'>
        <input type='text' name='username'>
        <input type='password' name='password'>
        <input type='submit'>
        </form>`;
    response.send(template);
});

router.post('/status',(request,response)=>{
    const username = request.body.username;
    const password = request.body.password;
    const currentUser = new User({username:username,password:password});

        User.findOne({username:username},'username',(error,foundres)=>{
            if(error) throw error;

                if(foundres){
                    response.send(`name '${username}' already exists in database`);
                }
                else{
                    currentUser.save((err)=>{
                        if(err){
                            response.send(`invalid input format`);
                        }
                        else{
                            response.send(`name '${username}' successfully registered to database`);
                        }
                    });
                }
        });
});

module.exports = router;