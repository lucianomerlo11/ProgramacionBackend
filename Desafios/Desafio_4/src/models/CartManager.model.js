import { fileURLToPath } from "url";
import Cart from "./Cart.model.js";
import { promises } from "fs";
import { dirname, join } from "path";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);

class CartManager{
    constructor(){

    }

    addCart = async(cart) => {

        try {
            const c = new Cart(cart.products, '../cart.txt');
            await c.setCartID();
    
            const { id, products } = c;
    
            const { size } = await promises.stat(join(currentDir, '../../cart.txt'));
    
            if(size == 0){
                await promises.writeFile(join(currentDir, '../../cart.txt'), JSON.stringify([{id: id, products: products}], null, 2));
                return '200';
            }
    
            const CARTS = await c.getCarts();
    
            CARTS.push({id: id, products: products});
    
            await promises.writeFile(join(currentDir, '../../cart.txt'), JSON.stringify(CARTS, null, 2));
    
            return '200';   
        } catch (error) {
            return '500';
        }
    }

    addProductCart = async (cid, pid) => {
        const PATH = join(currentDir, '../../cart.txt');

        try {
            // No recibio el cid o pid
            if (!cid || !pid) throw "400";
    
            const CARTS = JSON.parse(await promises.readFile(PATH, 'utf-8'));
        
            const CART = CARTS.find((c) => c.id == cid);
 
            // No existe el cart con cid ingresado
            if (!CART) throw '404';
        
            if (CART.products.length === 0) {
                // El array de productos del carrito encontrado no tiene productos
                CART.products.push({ product: pid, quantity: 1 });
            } else {
                const isProductInCart = CART.products.some((p) => p.product == pid);
        
                if (isProductInCart) {
                    // El producto esta en el carrito, debe incrementar la cantidad
                    CART.products.forEach((p) => {
                        if (p.product == pid) p.quantity++;
                    });
                } else {
                    // El producto no esta en el carrito
                    CART.products.push({ product: pid, quantity: 1 });
                }
            }
        
            await promises.writeFile(PATH, JSON.stringify(CARTS, null, 2));
        
            return '200';   
        } catch (error) {
            return error;
        }
    }
}

export default CartManager;