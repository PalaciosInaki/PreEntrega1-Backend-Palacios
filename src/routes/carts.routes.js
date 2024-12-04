import CartManager from "../services/CartManager.js";
import express from 'express';


const cartManager = new CartManager()
const cartRouter = express.Router();


cartRouter.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
});

cartRouter.get('/:cid', (req, res) => {
    const cart = cartManager.getCartById(Number(req.params.cid));
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json(cart);
});

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const updatedCart = await cartManager.addProductToCart(Number(req.params.cid), Number(req.params.pid));
        res.json(updatedCart);
    } catch (error) {
        res.status(404).json({ error: 'Error al agregar el producto al carrito' });
    }
});




export default cartRouter;