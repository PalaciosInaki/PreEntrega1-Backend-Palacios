const {Router} = require ('express')
const productRouter = require('./products.routes.js');
const cartRouter = require('./carts.routes.js');
const sessionRouter = require('./sessions.routes.js');


const indexRouter = Router();

indexRouter.use('/products', productRouter);
indexRouter.use('/carts', cartRouter);
indexRouter.use('/sessions', sessionRouter);


module.exports = indexRouter;

