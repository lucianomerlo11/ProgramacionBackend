import express from "express";
import PRODS_ROUTER from "./routes/products.routes.js";
import CART_ROUTER from "./routes/cart.routes.js";
import mongoose from "mongoose";
const PORT = 8080;
const app = express();

try {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.e3xoi1s.mongodb.net/?retryWrites=true&w=majority')

    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error de conexión:', error);
    process.exit(); // Termina el proceso en caso de error de conexión
  }
  

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use('/api/products', PRODS_ROUTER);
app.use('/api/carts', CART_ROUTER);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));