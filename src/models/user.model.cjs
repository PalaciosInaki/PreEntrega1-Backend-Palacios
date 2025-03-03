const mongoose = require('mongoose');
const cartModel = require('./cart.model.cjs');

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
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
        type: String,
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

//genero carrito al crear usuario
userSchema.post('save', async function (userCreated) {
    try {
        const newCart = await cartModel.create({ products: [] }); // Guarda el carrito en la BD
        await userModel.findByIdAndUpdate(userCreated._id, { cart: newCart._id }); // Asigna el carrito al usuario

    } catch (error) {
        console.log("Error al crear carrito para usuario:", error);
    }
});



const userModel = mongoose.model(userCollection, userSchema);

module.exports = userModel;