import { Router } from "express";
import Cart from "../models/Cart.model.js";
import CartManager from "../models/CartManager.model.js";

const CART_ROUTER = Router();
const C = new Cart([], '../cart.txt')
const CM = new CartManager();

CART_ROUTER.get('/:cid', async(req, res) => {
    const { cid } = req.params;
    try {

        if(!cid) res.status(400).send("No ingreso CID");

        const resp = await C.getCartByID(cid);

        if(!resp) throw '500';

        res.status(200).send(resp);
        
    } catch (error) {
        res.status(500).send("Error al obtener cart");
    }
})

CART_ROUTER.post('/', async(req, res) => {
    const { body } = req;

    try {
        res.send('Producto creado')
        
        const resp = await CM.addCart(body);

        if(resp == '200') res.status(200).send("Carrito creado");
        else throw '500'
    } catch (error) {
        if(error == '500') res.status(500).send("Error al crear cart");
        else res.status(500).send("Ocurrio un error inesperado");
    }



})

CART_ROUTER.post('/:cid/product/:pid', async(req, res) => {
    const { cid, pid } = req.params;

    try {
        const resp = await CM.addProductCart(cid, pid);
        if(resp == '200') res.status(200).send('Producto agregado');
        else throw resp;
        
    } catch (error) {
        switch (e) {
            case '400':
                res.status(400).send('Bad request: no ingreso cid o pid')
                break;
            case '404':
                res.status(404).send(`Not data found: no existe el cart ${cid}`)
                break;
            default:
                res.status(500).send("Ocurrio un error inesperado")
                break;
        }
    }

})

export default CART_ROUTER;