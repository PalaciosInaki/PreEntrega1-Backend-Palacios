const { Router } = require('express')
const CartController = require('../controllers/cartController.cjs')
const authorization = require('../config/middlewares.cjs')
const passport = require('passport')

const cartRouter = Router()

cartRouter.post('/', authorization('user'), CartController.createCart)

cartRouter.post('/:cid/checkout', authorization('user'), CartController.checkout)

cartRouter.get('/:cid', CartController.getCartById)

cartRouter.post('/add', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log("🔍 Usuario autenticado en la ruta:", req.user)
    next()
}, authorization('user'), CartController.addToCart)

module.exports = cartRouter
