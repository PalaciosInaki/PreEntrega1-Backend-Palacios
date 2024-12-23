const express = require('express');
const CartController = require('../controllers/cartController.cjs');

const cartRouter = express.Router();

cartRouter.post('/', CartController.createCart); // Crear un nuevo carrito
cartRouter.get('/:id', CartController.getCartById); // Obtener un carrito por ID
cartRouter.post('/:id/products', CartController.addProductToCart); // Agregar un producto al carrito

module.exports = cartRouter;
