import { Router } from 'express';
import ProductManager from '../services/ProductManager.js';

const viewsRouter = Router();
const productManager = new ProductManager();
await productManager.init(); 


viewsRouter.get('/home', async (req, res) => {
    const products = productManager.getProducts();
    res.render('home', { products });
});


viewsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

export default viewsRouter;
