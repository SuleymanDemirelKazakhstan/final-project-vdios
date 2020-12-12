const express = require('express');
const router = express.Router();
const Pizza = require('../models/pizza.js');
const Order = require('../models/order.js');
const User = require('../models/user.js');


router.get('/',(request,response)=>{
    //lean parses mongoose object to json
    Pizza.find({}).lean().exec((error,foundres)=>{
        if(error) throw error;
        response.render('user_pizza',{pizzas:foundres});
    });
    
});

router.get('/basket',(request,response)=>{
    const pizza_id = request.query.pizza_id;
    if(!request.session.basket){
        request.session.basket = {};
    }

    if(!request.session.basket[pizza_id]){
        request.session.basket[pizza_id] = 1;
    }
    else{
        request.session.basket[pizza_id] += 1;
    }
    ///adding the pizza to session.basket and redirecting back to home page
    response.redirect('/home');
});

////make order////

function getTotalCost(orderlist){
    let total=0;
    for(let item of orderlist){
        total+=item.pizza_description.price*item.count;
    }
    return total;
}

router.get('/order',(request,response)=>{
    const basketlist = request.session.basket;
    //in orderlist we will keep array of pairs {pizza,count}
    let orderlist = [];
    for(let item in basketlist){
        Pizza.findById(item).lean().exec((error,foundres)=>{
            if(error) throw error;
            orderlist.push({pizza_description:foundres,count:basketlist[item]});
        });
    }

    //searching for the current user who is making the order, but it's not necessary to be logged in to make any order
    User.findOne({username:request.session.username}).lean().exec((error,foundres)=>{
        if(error) throw error;
        request.session.orderlist = orderlist;
        const totalcost = getTotalCost(orderlist);
        response.render('user_basket',{userdata:foundres,order:orderlist,totalcost:totalcost});
    });
});

router.get('/order/drop',(request,response)=>{
    request.session.basket = null;
    response.redirect('/home/order');
});

router.post('/order/status',(request,response)=>{
    const phone_number = request.body.phone_number;
    const address = request.body.address;
    const currentOrder = new Order({username:request.session.username,phone_number:phone_number,address:address,basket:request.session.orderlist});
    currentOrder.save((err)=>{
        if(err){
            response.render('status',{status:err});
        }
        else{
            request.session.basket = {};
            response.render('status',{status:`order successfully registered to database`});
        }
    });  
});

///my orders///

router.get('/my_orders',(request,response)=>{
    if(request.session.username){
        Order.find({username:request.session.username}).lean().exec((error,foundres)=>{
            if(error) throw error;
            response.render('user_orders',{orders:foundres});
        });
    }
    else{
        response.render('status',{status:`please, <a href='/auth'>login</a>`})
    }
});

module.exports = router;