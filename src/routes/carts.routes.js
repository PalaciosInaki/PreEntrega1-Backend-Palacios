const express = require('express');
const CartController = require('../controllers/cartController.cjs');

const cartRouter = express.Router();

cartRouter.post('/', CartController.createCart); 

cartRouter.get('/', CartController.getCarts);

cartRouter.get('/:id', CartController.getCartById);


cartRouter.post('/add', CartController.addToCart);

module.exports = cartRouter;
