const express = require('express');
const ProductManager = require("./classes/ProductManager")
const app = express();

app.set('port', 3000)

app.listen(app.get('port'))

// Testing de Entregable

// Se creará una instancia de la clase “ProductManager”
const PM = new ProductManager([]);

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(PM.getProducts())
console.log()
/**
 * Se llamará al método “addProduct” con los campos:
    title: “producto prueba”
    description:”Este es un producto prueba”
    price:200,
    thumbnail:”Sin imagen”
    code:”abc123”,
    stock:25
 */
PM.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
})
// El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(PM.getProducts())
console.log()
// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
PM.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
})
console.log(PM.getProducts())
console.log()
// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
console.log(PM.getProductById(1))
console.log()
console.log(PM.getProductById(100))
console.log()