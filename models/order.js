const mongoose = require('mongoose');
const pizzaSchema = require('./pizza.js').schema;

const pizza_item = mongoose.Schema({
    pizza_description:pizzaSchema,
    count:Number
});

const orderSchema = mongoose.Schema({
    address:{
        type:String,
        required:true
    },

    phone_number:{
        type:String,
        required:true
    },

    basket:{
        type:[pizza_item],
        required:true
    }
});

module.exports = mongoose.model('order',orderSchema);