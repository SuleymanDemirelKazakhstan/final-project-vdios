const express = require('express');
const router = express.Router();
const Pizza = require('../models/pizza.js');

router.get('/',(request,response)=>{
    Pizza.find({},'name price',(error,foundres)=>{
        if(error) throw error;

      
    });
});

module.exports = router;