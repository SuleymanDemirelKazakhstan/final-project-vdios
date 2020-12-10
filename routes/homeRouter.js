const express = require('express');
const router = express.Router();
const Pizza = require('../models/pizza.js');
const Order = require('../models/order.js');
const User = require('../models/user.js');


router.get('/',(request,response)=>{
    //lean parses mongoose object to json
    Pizza.find({}).lean().exec((error,foundres)=>{
        if(error) throw error;
        response.render('pizza_card',{pizzas:foundres});
    });
    
});

router.get('/basket',(request,response)=>{
    const name = request.query.name;
    if(!request.session.basket){
        request.session.basket = {};
    }

    if(!request.session.basket[name]){
        request.session.basket[name] = 1;
    }
    else{
        request.session.basket[name] += 1;
    }

    const template = `<a href='/home'>back</a>`
    response.render('status',{status:template});
});

router.get('/order',(request,response)=>{
    const basketlist = request.session.basket;

    let orderlist = [];
    for(let item in basketlist){
        Pizza.findOne({name:item}).lean().exec((error,foundres)=>{
            if(error) throw error;
            orderlist.push({pizza_description:foundres,count:basketlist[item]});
        });
    }

    User.findOne({username:request.session.username}).lean().exec((error,foundres)=>{
        if(error) throw error;
        response.render('order',{order:orderlist,userdata:foundres});
    });
});

router.post('/order/status',(request,response)=>{
    const phone_number = request.body.phone_number;
    const address = request.body.address;
    const currentOrder = new Order({phone_number:phone_number,address:address,basket:request.session.orderlist});
    currentOrder.save((err)=>{
        if(err){
            response.render('status',{status:err});
        }
        else{
            response.render('status',{status:`order successfully registered to database`});
        }
    });  
});

module.exports = router;