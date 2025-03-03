const {Router} = require ('express')
const productRouter = Router();
const productController = require('../controllers/productController.cjs');
const authorization = require('../config/middlewares.cjs');

productRouter.post('/', authorization('admin'), productController.createProduct);

productRouter.get('/', productController.getProducts);

productRouter.get('/:id', productController.getProductById);

productRouter.get('/:id/edit', authorization('admin'), productController.editProductForm); 

productRouter.post('/:id/edit', authorization('admin'), productController.updateProduct); 

productRouter.post('/:id/delete', authorization('admin'), productController.deleteProduct); 



module.exports = productRouter;