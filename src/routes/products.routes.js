const {Router} = require ('express')
const productRouter = Router();
const productController = require('../controllers/productController.cjs');

productRouter.post('/', productController.createProduct);

productRouter.get('/', productController.getProducts);

productRouter.get('/:id', productController.getProductById);

productRouter.put('/:id', productController.updateProduct);

productRouter.delete('/delete/:id', productController.deleteProduct);


module.exports = productRouter;