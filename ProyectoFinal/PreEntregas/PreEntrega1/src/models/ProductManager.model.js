import { promises } from 'fs';
import { dirname, join } from 'path';
import Product from "../models/Product.model.js";
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);

class ProductManager {
  constructor(route, products = []) {
    this.path = join(currentDir, `../${route}`); // Ruta relativa al directorio de ProductManager.js
    this.products = products;
  }

  getProducts = async () => {
    try {
      const data = await promises.readFile(this.path, 'utf-8');
      return JSON.parse(data)
    } catch (error) {
      return []
    }
  }

  getProductById = async (id) => {
    const products = await this.getProducts();
    const productFoundById = products.find((p) => p.id == id);
    return productFoundById ? productFoundById : "Not found";
  };

  addProduct = async (newProduct) => {
    const { code, title, description, price, thumbnail, stock, status, category } = newProduct;
  
    try {
      if (!code) throw new Error("Error: Código de producto no ingresado");
      
      const productFound = this.products.find((p) => p.code === code);
  
      if (productFound) throw new Error("Error: El producto ya existe");
  
      if (!title || !description || !price || !stock || !category) {
        throw new Error("Error: Todos los campos son obligatorios");
      }
  
      const p = new Product(title, description, price, thumbnail, code, stock, status, category);
  
      await p.setLastID();
  
      const { size } = await promises.stat(this.path);
  
      if (size !== 0) {
        const products = JSON.parse(await promises.readFile(this.path, 'utf-8'));
        this.products = products;
        this.products.push(p);
      } else {
        this.products.push(p);
      }
  
      await promises.writeFile(this.path, JSON.stringify(this.products, null, 2)); // Convertir a cadena JSON antes de escribir, usando null y 2 para formato legible.
    } catch (error) {
      return error;
    }
  };
  

  updateProduct = async (productID = null, productFields = null) => {
    try {
      if (!productID || !productFields) {
        throw new Error('No ingresó ID de producto o no ingresó los datos a actualizar');
      }
  
      const products = await this.getProducts();
  
      if (products.length === 0) {
        throw new Error("No hay productos registrados");
      }
  
      const productIndex = products.findIndex((p) => p.id == productID);
  
      if (productIndex === -1) {
        throw new Error("Error: producto no encontrado");
      }
  
      const { id, ...updatedFields } = productFields; // Excluir explícitamente el campo "id"
      const updatedProduct = { ...products[productIndex], ...updatedFields };
      this.products[productIndex] = updatedProduct;
  
      await promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
  
    } catch (error) {
      return error;
    }
  };
  

  deleteProduct = async(productID = null) => {
    try {
      if(productID == null) throw "Debe ingresar un ID";
      const products = await this.getProducts();
      const product = await this.getProductById(productID) || null;

      if(!product) throw new Error("No existe el producto que quiere eliminar");
      else await promises.writeFile(this.path, JSON.stringify(products.filter((p) => p.id != productID), null, 2))
      
    } catch (error) {
      return error;
    }
  }
  
}

export default ProductManager;
