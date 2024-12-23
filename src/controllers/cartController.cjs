const CartManager = require('../services/CartManager.cjs');

const createCart = async (req, res) => {
    try {
        const cart = await CartManager.createCart();
        res.redirect(`/carts/${cart._id}`); // Redirige a la vista del carrito recién creado
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
        res.render('cartDetail', { cart }); // Renderiza la vista con los detalles del carrito
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
};

const addProductToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await CartManager.addProductToCart(req.params.id, productId, quantity);
        res.redirect(`/carts/${req.params.id}`); // Redirige a la vista del carrito actualizado
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
};

module.exports = {
    createCart,
    getCartById,
    addProductToCart,
};