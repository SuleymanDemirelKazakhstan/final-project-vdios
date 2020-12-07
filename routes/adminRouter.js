const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Pizza = require('../models/pizza.js');
const Order = require('../models/order.js');

router.get('/users',(request,response)=>{
    User.find({},'username password',(error,foundres)=>{
        if(error) throw error;

        if(foundres.length){
            let template = `users: `;
            for(let item of foundres)
                template += (item+'<br>');
            response.send(template);
        }
        else{
            response.send(`no users in database`);
        }
    });
});

router.get('/pizzas',(request,response)=>{
    Pizza.find({},'name price',(error,foundres)=>{
        if(error) throw error;

        if(foundres.length){
            let template = `pizzas: `;
            for(let item of foundres)
                template += (item+'<br>');
            response.send(template);
        }
        else{
            response.send(`no pizzas in database`);
        }
    });
});

router.get('/orders',(request,response)=>{
    Order.find({},'address price basket',(error,foundres)=>{
        if(error) throw error;
        if(foundres.length){
            let template = `orders: `;
            for(let item of foundres)
                template += (item+'<br>');
            response.send(template);
        }
        else{
            response.send(`no orders in database`);
        }
    });
});

module.exports = router;