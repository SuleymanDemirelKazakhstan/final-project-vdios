const mongoose = require('mongoose');

const pizzaSchema = mongoose.Schema({
    pizza_name:{
        type:String,
        required:true
    },

    recipe:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('pizza',pizzaSchema);