const express = require('express');
const fs = require('fs')
const ProductManager = require("./models/ProductManager");
const { send } = require('process');
const app = express();

const BASE_URL = "/products";
const ERROR = "Not found";

app.set('port', 8080);
app.use(express.urlencoded({extended:true}))

const PM = new ProductManager("../ejemplo.txt",[]);

app.get(BASE_URL, async (req, res) => {
    try {
        let limit = req.query.limit;
        const PRODUCTS = await PM.getProducts();
        res.send(!limit ? PRODUCTS : PRODUCTS.slice(0, limit))
    } catch (error) {
        res.send({error: "Ocurrio un error, intente más tarde."})
    }
});

app.get(`${BASE_URL}/:pid`, async (req, res) => {
    try {
        const PRODUCT = await PM.getProductById(req.params.pid);
        res.send( PRODUCT == ERROR ? {error: "El producto no existe"} : PRODUCT );
    } catch (error) {
        res.send({error: "Ocurrio un error, intente más tarde."})
    }
});

app.listen(app.get('port'));




