const express = require('express');
const CartController = require('../controllers/cartController.cjs');

const cartRouter = express.Router();

cartRouter.post('/', CartController.createCart); // Crear un nuevo carrito

// Ruta para mostrar todos los carritos
cartRouter.get('/', CartController.getCarts);

// Ruta para mostrar un carrito específico
cartRouter.get('/:id', CartController.getCartById);

cartRouter.post('/:id/products', CartController.addProductToCart); // Agregar un producto al carrito

module.exports = cartRouter;
