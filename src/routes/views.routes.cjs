const { Router } = require('express');
const ProductManager = require('../services/ProductManager.cjs');

const viewsRouter = Router();
const productManager = new ProductManager();




viewsRouter.get('/home', async (req, res) => {
    const products = productManager.getProducts();
    res.render('home', { products });
});


viewsRouter.get('/realtimeproducts', (req, res) => {
    res.render('index');
});

module.exports = viewsRouter;
