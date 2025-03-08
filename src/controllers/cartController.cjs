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

//const addToCart = async (req, res) => {
   // try {
   //     const { productId } = req.body;

   //     const cart = await CartManager.addProductToCart(productId);

   //     res.redirect('/carts');
   // } catch (error) {
   //     res.status(500).render('error', { error: error.message });
   // }
//};
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



module.exports = {
    createCart,
    getCarts,
    getCartById,
    addToCart,
};