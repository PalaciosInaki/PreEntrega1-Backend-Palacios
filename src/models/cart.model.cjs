const mongoose = require('mongoose');

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            id_product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products', // Relación con la colección de productos
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        }],
        default: []
    },
});

cartSchema.pre('findOne', function() {
    this.populate('products.id_product');
});

const cartModel = mongoose.model(cartCollection, cartSchema);

module.exports = cartModel;
