const fs = require('fs');
const path = require('path');

class ProductManager {
  constructor(route, products = []) {
    this.path = path.join(__dirname, route); // Ruta relativa al directorio de ProductManager.js
    this.products = products;
  }

  getProducts = async () => {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
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
  
}

module.exports = ProductManager;
