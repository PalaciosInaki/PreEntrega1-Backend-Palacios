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

    async getCarts() {
      try {
          return await cartModel.find().lean(); // Recupera todos los carritos
      } catch (error) {
          throw new Error(`Error fetching carts: ${error.message}`);
      }
  }
  

    async getCartById(cartId) {
        try {
            return await cartModel.findById(cartId).populate('products.productId').lean();
        } catch (error) {
            throw new Error(`Error fetching cart by ID: ${error.message}`);
        }
    }

    async addProductToCart(productId) {
        try {
            let cart = await cartModel.findOne();
            if (!cart) {
                //si no existe un carrito lo crea
                cart = new cartModel({ products: [] });
            }

            const existingProduct = cart.products.find((p) => p.product.toString() === productId);

            if (existingProduct) {
                //si el producto ya esta incrementa la cantidad
                existingProduct.quantity += 1;
            } else {
                //si no lo agrega
                cart.products.push({ product: productId });
            }

            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`Error adding product to cart: ${error.message}`);
        }
    }
}

module.exports = new CartManager();