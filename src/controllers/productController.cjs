const ProductManager = require('../services/ProductManager.cjs');

const createProduct = async (req, res) => {
    try {
        const product = await ProductManager.createProduct(req.body);
        res.redirect('/products'); 
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await ProductManager.getProducts();
        res.render('products', { products }); 
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
        res.render('productDetail', { product }); 
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
};


const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await ProductManager.updateProduct(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).render('error', { error: 'Producto no encontrado' });
        }
        res.redirect('/products');
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await ProductManager.deleteProduct(req.params.id);
        if (!deletedProduct) {
            return res.status(404).render('error', { error: 'Producto no encontrado' });
        }
        res.redirect('/products');
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
};


const editProductForm = async (req, res) => {
    try {
        const product = await ProductManager.getProductById(req.params.id);
        if (!product) {
            return res.status(404).render('error', { error: 'Producto no encontrado' });
        }
        res.render('editProduct', { product });
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
    editProductForm
};