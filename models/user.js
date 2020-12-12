const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    phone_number:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('user',userSchema);