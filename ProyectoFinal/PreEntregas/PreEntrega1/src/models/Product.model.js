import { promises } from "fs";
import { dirname, join } from 'path';
import { fileURLToPath } from "url";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);

class Product{
    static lastId = 0;
    constructor(title, description, price, thumbail, code, stock, status = true, category){
        this.id = 0;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbail = thumbail;
        this.code = code;
        this.stock = stock;
        this.status = status;
        this.category = category;
    }

    getLastProductID = async () => {
        const path = join(currentDir, '../../products.txt')
        let lastID = 0;

        const size = (await promises.stat(path)).size;
        
        if(size == 0) return lastID;
        
        const PRODUCTS = JSON.parse(await promises.readFile(path, 'utf-8'));
        
        if(!PRODUCTS) return lastID;

        PRODUCTS.forEach((p) => { if(p.id > lastID) lastID = p.id; });

        return lastID;

    }

    setLastID = async () => {
        this.id = await this.getLastProductID() + 1;
    }
}

export default Product;
