const {Router} = require ('express')
const productRouter = Router();
const productController = require('../controllers/productController.cjs');

productRouter.post('/', productController.createProduct);

productRouter.get('/', productController.getProducts);

productRouter.get('/:id', productController.getProductById);

productRouter.get('/:id/edit', productController.editProductForm); 

productRouter.post('/:id/edit', productController.updateProduct); 

productRouter.post('/:id/delete', productController.deleteProduct); 



module.exports = productRouter;