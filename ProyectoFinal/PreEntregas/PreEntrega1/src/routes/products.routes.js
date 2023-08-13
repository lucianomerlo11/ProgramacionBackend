import { Router } from "express";
import ProductManager from "../models/ProductManager.model.js";

const PRODS_ROUTER = Router();
const PM = new ProductManager('../products.txt', []);

PRODS_ROUTER.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const PRODUCTS = await PM.getProducts();
        res.status(200).send(!limit ? PRODUCTS : PRODUCTS.slice(0, limit));
    } catch (error) {
        res.status(500).send({error});
    }
})

PRODS_ROUTER.get('/:pid', async(req, res) => {
    try {
        const ERROR = "Not found";
        const PRODUCT = await PM.getProductById(req.params.pid);
        if(PRODUCT == ERROR) res.status(404).send({});
        else res.status(200).send(PRODUCT);
    } catch (error) {
        res.status(500).send({error});
    }
})

PRODS_ROUTER.post('/', async(req, res) => {
    try {
        const { body } = req;

        if(!body) throw "No ha ingresado datos";

        const resp = await PM.addProduct(body);

        if(resp instanceof Error) throw resp;
        
        res.status(200).send("Producto registrado")

    } catch (error) {
        res.status(500).send(error);
    }
})

PRODS_ROUTER.put('/:pid', async(req, res) => {
    try {
        const { pid } = req.params;
        const { body } = req;
        if(!pid) throw 'ID no ingresado';
        if(!body) throw 'No hay datos para actualizar';

        const resp = await PM.updateProduct(pid, body);

        if(!resp) res.status(200).send("Producto actualizado");
        else throw resp;

    } catch (error) {
        res.status(500).send(error)
    }
})

PRODS_ROUTER.delete('/:pid', async(req, res) => {
    try {
        const { pid } = req.params;
        if(!pid) throw 'ID no ingresado';

        const resp = await PM.deleteProduct(pid);

        if(!resp) res.status(200).send("Producto eliminado");
        else throw resp;

    } catch (error) {
        res.status(500).send(error)
    }
})

export default PRODS_ROUTER;