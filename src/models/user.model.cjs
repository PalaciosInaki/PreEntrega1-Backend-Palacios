const mongoose = require('mongoose');

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true      
    },
    password: {
        type: Number,
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts', // Relación con la colección de productos
        required: false 
    },
    role: {
        type: String,
        default: 'user'
    }
    

});

const userModel = mongoose.model(userCollection, userSchema);

module.exports = userModel;