class Product{
    static lastId = 0;
    constructor(title, description, price, thumbail, code, stock){
        this.id = ++Product.lastId;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbail = thumbail;
        this.code = code;
        this.stock = stock;
    }
}

module.exports = Product;
