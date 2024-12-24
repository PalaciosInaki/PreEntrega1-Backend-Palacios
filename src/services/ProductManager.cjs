const productModel = require('../models/product.model.cjs');

class ProductManager {
    async createProduct(productData) {
        try {
            const product = new productModel(productData);
            return await product.save();
        } catch (error) {
            throw new Error(`Error creating product: ${error.message}`);
        }
    }

    async getProducts() {
        try {
            return await productModel.find().lean();
        } catch (error) {
            throw new Error(`Error fetching products: ${error.message}`);
        }
    }

    async getProductById(id) {
        try {
            return await productModel.findById(id).lean();
        } catch (error) {
            throw new Error(`Error fetching product by ID: ${error.message}`);
        }
    }

    async updateProduct(id, productData) {
        try {
            return await productModel.findByIdAndUpdate(id, productData, { new: true }).lean();
        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }

    async deleteProduct(id) {
        try {
            return await productModel.findByIdAndDelete(id).lean();
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }
}

module.exports = new ProductManager();

