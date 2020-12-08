const express = require('express');
const router = express.Router();
const Pizza = require('../models/pizza.js');

router.get('/',(request,response)=>{
    //lean parses mongoose object to json
    Pizza.find({}).lean().exec((error,foundres)=>{
        if(error) throw error;
        response.render('pizza_card',{pizzas:foundres});
    });
    
});

module.exports = router;