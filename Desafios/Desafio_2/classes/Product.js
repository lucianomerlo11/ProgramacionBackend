const fs = require("fs")
const path = require('path');
class Product{
    static lastId = 0;
    constructor(title, description, price, thumbail, code, stock){
        this.id = 0;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbail = thumbail;
        this.code = code;
        this.stock = stock;
    }

    getLastProductID = () => {
        let lastID = 0;
        const PRODUCTS = JSON.parse(fs.readFileSync(path.join(__dirname, "../ejemplo.txt")));
        
        PRODUCTS.forEach((p) => { if(p.id > lastID) lastID = p.id; });

        return lastID;

    }

    setLastID = () => {
        this.id = this.getLastProductID() + 1;
    }
}

module.exports = Product;
