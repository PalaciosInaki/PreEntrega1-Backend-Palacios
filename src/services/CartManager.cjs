const cartModel = require('../models/cart.model.cjs');

class CartManager {
    async createCart() {
        try {
            const cart = new cartModel({ products: [] });
            return await cart.save();
        } catch (error) {
            throw new Error(`Error creating cart: ${error.message}`);
        }
    }

    async getCartById(cartId) {
        try {
            return await cartModel.findById(cartId).populate('products.productId').lean();
        } catch (error) {
            throw new Error(`Error fetching cart by ID: ${error.message}`);
        }
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                throw new Error('Cart not found');
            }

            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

            if (productIndex >= 0) {
                cart.products[productIndex].quantity += quantity; // Incrementa la cantidad si el producto ya está en el cart
            } else {
                cart.products.push({ productId, quantity }); // Agrega un nuevo producto
            }

            return await cart.save();
        } catch (error) {
            throw new Error(`Error adding product to cart: ${error.message}`);
        }
    }
}

module.exports = new CartManager();