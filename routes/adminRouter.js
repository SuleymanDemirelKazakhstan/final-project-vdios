const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Pizza = require('../models/pizza.js');
const Order = require('../models/order.js');

///users///

router.get('/users',(request,response)=>{
    User.find({}).lean().exec((error,foundres)=>{
        if(error) throw error;
        response.render('admin_users',{layout:'admin',users:foundres});
    });
});

router.get('/users/delete',(request,response)=>{
    const user_id = request.query.user_id;
    User.findByIdAndDelete(user_id, (err)=>{
        if(err) throw err;
        response.redirect('/admin/users');
    })
});

///pizzas///

router.get('/pizzas',(request,response)=>{
    Pizza.find({}).lean().exec((error,foundres)=>{
        if(error) throw error;
        response.render('admin_pizzas',{layout:'admin',pizzas:foundres});
    });
});

router.get('/pizzas/create',(request,response)=>{
    response.render('admin_create_pizza',{layout:'admin'});
});

router.post('/pizzas/create/status',(request,response)=>{
    const pizza_name = request.body.pizza_name;
    const recipe = request.body.recipe;
    const price = request.body.price;
    
    const current_pizza = new Pizza({pizza_name:pizza_name,recipe:recipe,price:price});
    current_pizza.save((err)=>{
        if(err) throw err;
        response.redirect('/admin/pizzas');
    });
});

router.get('/pizzas/delete',(request,response)=>{
    const pizza_id = request.query.pizza_id;
    Pizza.findByIdAndDelete(pizza_id, (err)=>{
        if(err) throw err;
        response.redirect('/admin/pizzas');
    })
});

///orders///

router.get('/orders',(request,response)=>{
    Order.find({}).lean().exec((error,foundres)=>{
        if(error) throw error;
        response.render('admin_orders',{layout:'admin',orders:foundres});
    });
});

router.get('/orders/delete',(request,response)=>{
    const order_id = request.query.order_id;
    Order.findByIdAndDelete(order_id, (err)=>{
        if(err) throw err;
        response.redirect('/admin/orders');
    })
});

module.exports = router;