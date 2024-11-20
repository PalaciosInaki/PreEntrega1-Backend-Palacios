import fs from 'fs/promises';
import path from 'path';

const productosFilePath = path.resolve('data', 'productos.json');


export default class ProductManager {

    constructor() {
        this.filePath = path.join(__dirname, 'data', 'productos.json');
        this.products = []; // Inicializamos vacío
    }

    // Método asíncrono para cargar los productos
    async init() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            this.products = JSON.parse(data); // Cargamos los productos
        } catch (error) {
            console.log("No se pudo cargar el archivo de productos, inicializando vacío.");
            this.products = []; // Si falla, inicializamos como vacío
        }
    }

    // Guardar los productos en el archivo
    async saveProducts() {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(this.products, null, 2), 'utf-8');
        } catch (error) {
            console.log("Error al guardar los productos:", error);
        }
    }

    // Obtener todos los productos, con limitación opcional
    getProducts(limit = null) {
        if (limit) {
            return this.products.slice(0, limit);
        }
        return this.products;
    }

    // Obtener un producto por id
    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    // Agregar un nuevo producto
    async addProduct(product) {
        const id = this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
        const newProduct = { id, ...product, status: true };
        this.products.push(newProduct);
        await this.saveProducts(); // Guardamos después de agregar el producto
        return newProduct;
    }

    // Actualizar un producto
    async updateProduct(id, updatedFields) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Producto no encontrado');
        this.products[index] = { ...this.products[index], ...updatedFields };
        await this.saveProducts();
        return this.products[index];
    }

    // Eliminar un producto
    async deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Producto no encontrado');
        const deletedProduct = this.products.splice(index, 1);
        await this.saveProducts();
        return deletedProduct[0];
    }
}





