const ProductManager = require('../services/ProductManager.cjs');

const createProduct = async (req, res) => {
    try {
        const product = await ProductManager.createProduct(req.body);
        res.redirect('/products'); // Redirige a la lista de productos
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await ProductManager.getProducts();
        res.render('products', { products }); // Renderiza la vista 'products' y pasa los productos
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await ProductManager.getProductById(req.params.id);
        if (!product) {
            return res.status(404).render('error', { error: 'Producto no encontrado' });
        }
        res.render('productDetail', { product }); // Renderiza la vista 'productDetail'
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await ProductManager.updateProduct(req.params.id, req.body);
        if (!product) {
            return res.status(404).render('error', { error: 'Producto no encontrado' });
        }
        res.redirect('/products');
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await ProductManager.deleteProduct(req.params.id);
        if (!product) {
            return res.status(404).render('error', { error: 'Producto no encontrado' });
        }
        res.redirect('/products');
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};