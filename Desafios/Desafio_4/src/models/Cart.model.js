import { promises, writeFile } from "fs";
import { dirname, join } from 'path';
import { fileURLToPath } from "url";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);

class Cart{
    constructor(products = [], path){
        this.id = 0;
        this.products = products;
        this.path = join(currentDir, `../${path}`)         
    }

    setCartID = async() => {
        this.id = await this.getLastCartID() + 1;
    }

    getLastCartID = async () => {
        let lastID = 0;

        const { size } = await promises.stat(this.path);

        if(size == 0) return lastID;

        const CARTS = JSON.parse(await promises.readFile(this.path, 'utf-8'));

        CARTS.forEach((c) => { if(c.id > lastID) lastID = c.id})

        return lastID;

    }

    getCarts = async() => {

        try {

            const { size } = await promises.stat(this.path);
    
            if(size == 0) return [];
    
            const CARTS = JSON.parse(await promises.readFile(this.path, 'utf-8'));
    
            return CARTS;
        } catch (error) {
            return error;
        }

    }

    getCartByID = async(cid) => {
        try {
            if(!cid) throw "400";

            const CARTS = await this.getCarts()

            if(!CARTS || CARTS.length == 0) throw "404";
            
            const CART = CARTS.find((c) => c.id == cid);

            if(!CART) throw "404"

            return CART;

        } catch (error) {
            return error == 400 ? 400 : error == 404 ? 404 : 500;
        }
    }
}

export default Cart;