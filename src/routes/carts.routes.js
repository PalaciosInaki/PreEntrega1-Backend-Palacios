const express = require('express');
const CartController = require('../controllers/cartController.cjs');
const authorization = require('../config/middlewares.cjs');
const passport = require('passport');


const cartRouter = express.Router();

cartRouter.post('/', authorization('user'), CartController.createCart); 

//cartRouter.get('/', CartController.getCarts);

cartRouter.get('/:id', CartController.getCartById); 

cartRouter.post('/add', passport.authenticate('jwt', { session: false }), authorization('user'), CartController.addToCart);

module.exports = cartRouter;
