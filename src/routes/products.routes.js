import ProductManager from '../services/ProductManager.js'; 
import { io } from '../app.js';

const productManager = new ProductManager()
const productRouter = express.Router();

productRouter.get('/', (req, res) => {
    const limit = parseInt(req.query.limit) || null;
    const products = productManager.getProducts(limit);
    res.json({ products });
});

productRouter.get('/:pid', (req, res) => {
    const product = productManager.getProductById(Number(req.params.pid));
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
});

productRouter.post('/', async (req, res) => {
    const { title, description, code, price, stock, category } = req.body;
    const newProduct = await productManager.addProduct({ title, description, code, price, stock, category });
    
    
    io.emit('updateProducts', productManager.getProducts());

    res.status(201).json(newProduct);
});

productRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const { title, description, price, stock, category, status } = req.body;
    try {
        const updatedProduct = await productManager.updateProduct(Number(pid), { title, description, price, stock, category, status });
        res.json(updatedProduct);
    } catch (error) {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

productRouter.delete('/:pid', async (req, res) => {
    try {
        const deletedProduct = await productManager.deleteProduct(Number(req.params.pid));
        
        
        io.emit('updateProducts', productManager.getProducts());

        res.json(deletedProduct);
    } catch (error) {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

export default productRouter;
