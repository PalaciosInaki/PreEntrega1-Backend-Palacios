const fs = require('fs/promises');
const path = require('path');
const { fileURLToPath } = require('url');  
const { dirname } = require('path');  



const productosFilePath = path.resolve('data', 'products.json');

class ProductManager {

    constructor() {
        this.filePath = path.join(__dirname, 'data', 'productos.json');  
        this.products = []; 
    }


    async init() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            this.products = JSON.parse(data); 
        } catch (error) {
            console.log("No se pudo cargar el archivo de productos, inicializando vacío.");
            this.products = [];
        }
    }


    async saveProducts() {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(this.products, null, 2), 'utf-8');
        } catch (error) {
            console.log("Error al guardar los productos:", error);
        }
    }


    getProducts(limit = null) {
        if (limit) {
            return this.products.slice(0, limit);
        }
        return this.products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }


    async addProduct(product) {
        const id = this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
        const newProduct = { id, ...product, status: true };
        this.products.push(newProduct);
        await this.saveProducts();
        return newProduct;
    }


    async updateProduct(id, updatedFields) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Producto no encontrado');
        this.products[index] = { ...this.products[index], ...updatedFields };
        await this.saveProducts();
        return this.products[index];
    }

    async deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Producto no encontrado');
        const deletedProduct = this.products.splice(index, 1);
        await this.saveProducts();
        return deletedProduct[0];
    }
}




module.exports = ProductManager;

