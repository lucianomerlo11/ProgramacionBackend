import express from "express";
import PRODS_ROUTER from "./routes/products.routes.js";
import CART_ROUTER from "./routes/cart.routes.js";
import { Server } from 'socket.io';
import handlebars from 'express-handlebars'
import __dirname from "./utils.js";
import ROUTER from './routes/views.router.js'
import ProductManager from "./models/ProductManager.model.js";
const PORT = 8080;
const app = express();
const HTTP_SERVER = app.listen(PORT, () => console.log("Listening on PORT 8080"))
const SOCKET_SERVER = new Server(HTTP_SERVER);

const PM = new ProductManager('../products.txt', [])

const prods = [];

app.engine('handlebars', handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));
app.use('/', ROUTER)

SOCKET_SERVER.on('connection', async (socket) => {
    console.log("Nuevo cliente conectado")
    prods.push(await PM.getProducts())

    socket.on('newProduct', async (newProduct) => {
        await PM.addProduct(newProduct)
        prods.push(newProduct);
        console.log(newProduct);
        socket.emit('prods', prods)
    })

    socket.on('deleteProduct', async (productID) => {
        await PM.deleteProduct(productID);
        socket.emit('prodDeleted', productID);
    })
})
// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use('/api/products', PRODS_ROUTER);
app.use('/api/carts', CART_ROUTER);

