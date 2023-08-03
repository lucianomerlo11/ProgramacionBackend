const express = require('express');
const fs = require('fs')
const ProductManager = require("./classes/ProductManager")
const app = express();

app.set('port', 3600)

app.listen(app.get('port'))

// Testing de Entregable

// Se creará una instancia de la clase “ProductManager”
const PM = new ProductManager("../ejemplo.txt",[]);

// Get products
console.log(PM.getProducts())

// Crear poducto
PM.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
})

// Get products
console.log(PM.getProducts())

// Get products by ID
console.log(PM.getProductById(1))

// Update:  se cambia el titulo
console.log(PM.updateProduct(1, {
    title: "producto",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
}))

// Delete
//console.log(PM.deleteProduct(1))


