const CartManager = require('../services/CartManager.cjs');

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

        const cart = await CartManager.addProductToCart(productId);

        res.redirect('/carts');
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
};

module.exports = {
    createCart,
    getCarts,
    getCartById,
    addToCart,
};