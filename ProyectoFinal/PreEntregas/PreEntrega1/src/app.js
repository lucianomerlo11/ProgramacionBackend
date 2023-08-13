import express from "express";
import PRODS_ROUTER from "./routes/products.routes.js";
import CART_ROUTER from "./routes/cart.routes.js";
const PORT = 8080;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use('/api/products', PRODS_ROUTER);
app.use('/api/carts', CART_ROUTER);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));