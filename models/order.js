const mongoose = require('mongoose');
const pizzaSchema = require('./pizza.js').schema;

const orderSchema = mongoose.Schema({
    address:{
        type:String,
        required:true
    },

    price:{
        type:String,
        required:true
    },

    basket:{
        type:pizzaSchema,
        default:{}
    }
    
});

module.exports = mongoose.model('order',orderSchema);