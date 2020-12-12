const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Pizza = require('../models/pizza.js');
const Order = require('../models/order.js');

///users///

router.get('/users',(request,response)=>{
    User.find({}).lean().exec((error,foundres)=>{
        if(error) throw error;
        response.render('admin_users',{users:foundres});
    });
});

router.get('/users/delete',(request,response)=>{
    const user_id = request.query.user_id;
    User.findByIdAndDelete(user_id, (err)=>{
        if(err) throw err;
        response.render('status',{status:`user with id ${user_id} successfully deleted`})
    })
});

///pizzas///

router.get('/pizzas',(request,response)=>{
    Pizza.find({}).lean().exec((error,foundres)=>{
        if(error) throw error;
        response.render('admin_pizzas',{pizzas:foundres});
    });
});

router.get('/pizzas/create',(request,response)=>{
    response.render('admin_create_pizza');
});

router.post('/pizzas/create/status',(request,response)=>{
    const pizza_name = request.body.pizza_name;
    const recipe = request.body.recipe;
    const price = request.body.price;
    
    const current_pizza = new Pizza({pizza_name:pizza_name,recipe:recipe,price:price});
    current_pizza.save((err)=>{
        if(err){
            response.render('status',{status:err});
        }
        else{
            response.render('status',{status:`pizza successfully created<br><a href='/admin/pizzas'>back</a>`});
        }
    });
});

router.get('/pizzas/delete',(request,response)=>{
    const pizza_id = request.query.pizza_id;
    Pizza.findByIdAndDelete(pizza_id, (err)=>{
        if(err) throw err;
        response.render('status',{status:`pizza with id ${pizza_id} successfully deleted<br><a href='/admin/pizzas'>back</a>`});
    })
});

///orders///

router.get('/orders',(request,response)=>{
    Order.find({}).lean().exec((error,foundres)=>{
        if(error) throw error;
        response.render('admin_orders',{orders:foundres});
    });
});

router.get('/orders/delete',(request,response)=>{
    const order_id = request.query.order_id;
    Order.findByIdAndDelete(order_id, (err)=>{
        if(err) throw err;
        response.render('status',{status:`order with id ${order_id} successfully deleted<br><a href='/admin/orders'>back</a>`});
    })
});

module.exports = router;