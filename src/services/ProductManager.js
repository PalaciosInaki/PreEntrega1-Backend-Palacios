import fs from 'fs/promises';
import path from 'path';

const productosFilePath = path.resolve('data', 'productos.json');


export default class ProductManager {
    constructor() {
      this.products = [];
      this.init()
      this.currentId = 1; // ID autoincrementable inicial
    }

    async init() {
        try {
            const data = await fs.readFile(productosFilePath, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.productos = [];
        }
    }
  
    // metodo obtener productos
    getProducts(limit) {
        if (limit) {
            return this.products.slice(0, limit);
        }
        return this.products;
    }
  
    // metodo agregar producto nuevo
    addProduct({ title, description, price, thumbnail, code, stock }) {
      // validar todos los campos
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        throw new Error("Todos los campos son obligatorios.");
      }
  
      // validar code no se repita
      if (this.products.some((product) => product.code === code)) {
        throw new Error(`El código '${code}' ya existe.`);
      }
  
      // agregar producto al arreglo 
      const newProduct = {
        id: this.currentId++, // Asignar ID único y autoincrementar
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      this.products.push(newProduct);
      return newProduct;
    }
  
    // metodo buscar producto por ID
    getProductById(id) {
      const product = this.products.find((product) => product.id === id);
  
      if (!product) {
        console.error("Not found");
        return null;
      }
  
      return product;
    }


  }

  

