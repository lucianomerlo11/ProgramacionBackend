import express from 'express';
import ProductManager from "../models/ProductManager.model.js";
const ROUTER = express.Router();
const PM = new ProductManager('../products.txt', []);


ROUTER.get('/', async (req, res) => {

    const PRODUCTS = await PM.getProducts();

    res.render('home', {products: PRODUCTS} );
});

ROUTER.get('/realtimeproducts', async (req, res) => {
    const PRODUCTS = await PM.getProducts();
    res.render('realTimeProducts', {products: PRODUCTS})
})

export default ROUTER;