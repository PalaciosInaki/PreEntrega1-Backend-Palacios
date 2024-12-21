const fs = require('fs/promises'); 
const path = require('path');
const { fileURLToPath } = require('url');  
const { dirname } = require('path');  


class CartManager {
  constructor() {
    this.filePath = path.join(__dirname, 'data', 'carts.json');  
    this.carts = [];
  }

  // Método asíncrono para cargar los carritos
  async init() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      this.carts = JSON.parse(data);
    } catch (error) {
      console.log("No se pudo cargar el archivo de carritos, inicializando vacío.");
      this.carts = [];
    }
  }

  // Guardar los carritos en el archivo
  async saveCarts() {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(this.carts, null, 2), 'utf-8');
    } catch (error) {
      console.log("Error al guardar los carritos:", error);
    }
  }

  // Crear un nuevo carrito
  async createCart() {
    const newCart = { id: this.carts.length + 1, products: [] };
    this.carts.push(newCart);
    await this.saveCarts(); 
    return newCart;
  }

  // Obtener un carrito por id
  getCartById(id) {
    return this.carts.find(cart => cart.id === id);
  }

  // Agregar un producto al carrito
  async addProductToCart(cid, pid) {
    const cart = this.getCartById(cid);
    if (!cart) throw new Error('Carrito no encontrado');

    const productIndex = cart.products.findIndex(p => p.product === pid);
    if (productIndex === -1) {
      cart.products.push({ product: pid, quantity: 1 });
    } else {
      cart.products[productIndex].quantity += 1; 
    }
    await this.saveCarts();
    return cart;
  }
}

module.exports = CartManager;