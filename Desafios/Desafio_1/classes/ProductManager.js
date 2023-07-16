const Product = require("./Product");



class ProductManager{
    constructor(products = []){
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
        this.products.push(p);
      };
      

    getProducts = () => {
        return this.products;
    }

    getProductById = (id) => {
        const productFoundById = this.products.find((p) => p.id === id);

        return productFoundById ? productFoundById : "Not found";
    }
}

module.exports = ProductManager;
