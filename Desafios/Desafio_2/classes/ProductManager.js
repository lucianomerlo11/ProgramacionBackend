const fs = require('fs');
const path = require('path');
const Product = require("./Product");

class ProductManager {
  constructor(route, products = []) {
    this.path = path.join(__dirname, route); // Ruta relativa al directorio de ProductManager.js
    this.products = products;
  }

  addProduct = (newProduct) => {
    const { code, title, description, price, thumbnail, stock } = newProduct;

    if (!code) {
      console.log("Not Data Found");
      return;
    }

    const productFound = this.products.find((p) => p.code === code);
    if (productFound) {
      console.log("Error: El producto ya existe");
      return;
    }

    if (!title || !description || !price || !thumbnail || !stock) {
      console.log("Error: Todos los campos son obligatorios");
      return;
    }

    const p = new Product(title, description, price, thumbnail, code, stock);

    const { size } = fs.statSync(this.path);

    if (size !== 0) {
      const products = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
      this.products = products;
      this.products.push(p);
    } else {
      this.products.push(p);
    }

    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2)); // Convertir a cadena JSON antes de escribir, usando null y 2 para formato legible.
  };

  getProducts = () => {
    try {
      const data = fs.readFileSync(this.path, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      return []
    }
  }


  getProductById = (id) => {
    const products = this.getProducts();
    const productFoundById = products.find((p) => p.id == id);
    return productFoundById ? productFoundById : "Not found";
  };

  updateProduct = (productID = null, productFields = null) => {
    try {
      if (!productID || !productFields) {
        return 'No ingreso ID de producto o no ingreso los datos a actualizar';
      }
  
      const products = this.getProducts();
  
      if (products.length === 0) {
        return "No hay productos registrados";
      }
  
      const productIndex = products.findIndex((p) => p.id == productID);
  
      if (productIndex === -1) {
        return "Error: producto no encontrado";
      }
  
      const updatedProduct = { ...products[productIndex], ...productFields };
      this.products[productIndex] = updatedProduct;
  
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
  
      return "Producto actualizado";
    } catch (error) {
      console.error(error);
      return "Error al actualizar producto";
    }
  };

  deleteProduct = (productID = null) => {
    try {
      if(!productID) return "Debe ingresar un ID";
      const products = this.getProducts();
      const product = this.getProductById(productID) || null;

      if(!product){
        return "No existe el producto que quiere eliminar";
      }else{
        fs.writeFileSync(
          this.path,
          JSON.stringify(
            products.filter((p) => p.id != productID),
            null,
            2
          )
        )
        return "Producto eliminado"
      }
    } catch (error) {
      return "Error al eliminar producto"
    }
  }
  
}

module.exports = ProductManager;
