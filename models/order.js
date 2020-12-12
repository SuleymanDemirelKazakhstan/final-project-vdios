const mongoose = require('mongoose');
const pizzaSchema = require('./pizza.js').schema;

const pizza_item = mongoose.Schema({
    pizza_description:pizzaSchema,
    count:Number
});

const orderSchema = mongoose.Schema({
    username:{
        type:String
    },

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
    },

    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('order',orderSchema);