const express = require ('express')
const productRouter = require('./products.routes.js');
const cartRouter = require('./carts.routes.js');
const sessionRouter = require('./sessions.routes.js');
const path = require('path');

const indexRouter = express.Router();

indexRouter.use('/products', productRouter);
indexRouter.use('/carts', cartRouter);
indexRouter.use('/sessions', sessionRouter);
indexRouter.use('/public', express.static(path.join(__dirname, 'public')));//concateno rutas

module.exports = indexRouter;

