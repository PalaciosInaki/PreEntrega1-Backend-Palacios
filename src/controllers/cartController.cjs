const CartManager = require('../services/CartManager.cjs');
const ticketModel = require('../models/ticket.model.cjs');
const productModel = require('../models/product.model.cjs');
const crypto = require('crypto');
const { default: cartModel } = require('../models/cart.model.cjs');

const createCart = async (req, res) => {
    try {
        const cart = await CartManager.createCart();
        res.redirect(`/carts/${cart._id}`);
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
};

const getCarts = async (req, res) => {
    try {
        const carts = await CartManager.getCarts();
        res.render('cartsList', { carts });
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
};


const getCartById = async (req, res) => {
    try {
        const cart = await CartManager.getCartById(req.params.id);
        if (!cart) {
            return res.status(404).render('error', { error: 'Carrito no encontrado' });
        }
        res.render('cartDetail', { cart });
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        console.log("Producto recibido en la petición:", productId);

        if (!productId) {
            console.log("❌ Error: No se envió productId");
            return res.status(400).send("Falta el ID del producto");
        }

        const cart = await CartManager.addProductToCart(req, productId);;
        console.log("🛒 Carrito actualizado:", cart);

        if (!cart) {
            console.log("❌ Error: No se pudo agregar el producto al carrito");
            return res.status(500).send("No se pudo agregar el producto al carrito");
        }

        res.redirect('/carts');
    } catch (error) {
        console.error("❌ Error en addToCart:", error);
        res.status(500).send("Error interno del servidor");
    }
};

const checkout = async (req, res) => {
    try {
        const cartId = req.params.cartID;
        const cart = await cartModel.findById(cartID)
        const prodStockNull = []

        if (cart) {
            // Verificar stock
            cart.products.forEach(async (product) => {
                let producto = await productModel.findById(product.productID)
                if (producto.stock - product.quantity < 0) {
                    prodStockNull.push(product.productID)
                }
            })
            if (prodStockNull.length === 0) {////finalizo compra si no hay productos sin stock
                let totalAmount = 0
                //descuento stock de los productos y calculo total de la compra 
                for (const product of cart.products) {
                    const prod = await productModel.findById(product.productID);
                    prod.stock -= product.quantity;
                    totalAmount += product.price * product.quantity;
                    await prod.save();
                }
                

                const newTicket = await ticketModel.create({
                    code: crypto.randomUUID(16),
                    purchase_datatime: new Date(),
                    amount: totalAmount,
                    purchaser: req.user.email,
                    products: cart.products
                })

                await cartModel.findByIdAndDelete(cartID)
                res.send("Compra finalizada", newTicket)

            } else {
                //saco del carrito todos los prod sin stock
                prodStockNull.forEach(async (prodId) => {
                    cart.products = cart.products.filter(product => product.productID !== prodId)
                })
                await cartModel.findByIdAndUpdate(cartID, { products: cart.products })
                res.send("Productos sin stock eliminados del carrito", prodStockNull)
            }
        }

    } catch (error) {
        res.status.send("Error en checkout");
    }


}




module.exports = {
    createCart,
    getCarts,
    getCartById,
    addToCart,
    checkout
}