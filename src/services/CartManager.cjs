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

    async addProductToCart(req, productId) {
        try {
            // ⚠️ Verificar que el usuario está autenticado
            if (!req.user) {
                throw new Error("Usuario no autenticado.");
            }
    
            // ⚠️ Verificar que el usuario tiene un carrito asignado
            if (!req.user.cart) {
                throw new Error("El usuario no tiene un carrito asignado.");
            }
    
            // Buscar el carrito del usuario logueado
            let cart = await cartModel.findById(req.user.cart);
    
            // Si no encuentra el carrito, lo crea
            if (!cart) {
                cart = new cartModel({ products: [] });
                await cart.save();
    
                // Asignar el carrito al usuario y guardar el usuario en la BD
                req.user.cart = cart._id;
                await req.user.save();
            }
    
            const existingProduct = cart.products.find((p) => p.id_product.toString() === productId);
    
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.products.push({ id_product: productId, quantity: 1 });
            }
    
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`Error agregando producto al carrito: ${error.message}`);
        }
    }
    
    
    
}

module.exports = new CartManager();