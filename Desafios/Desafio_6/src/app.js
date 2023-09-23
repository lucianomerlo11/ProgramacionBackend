import 'dotenv/config'
import express from "express";
import sessionRouter from "./routes/session.routes.js";
import mongoose from "mongoose";
import session from "express-session";

import handlebars from "express-handlebars"
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.routes.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import MongoStore from "connect-mongo";
import cookieParser from 'cookie-parser';
const PORT = 8080;
const app = express();

try {
    await mongoose.connect(process.env.MONGO_URL)

    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error de conexión:', error);
    process.exit(); // Termina el proceso en caso de error de conexión
  }
  

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+'/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname+'/public'))


app.get("/", (req, res) => {
  res.render('login')
})


// Middleware
app.use(express.json());
app.use(cookieParser(process.env.SIGNED_COOKIE))
app.use(express.urlencoded({extended:true}));
app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    ttl: 3600
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

// Routes
app.use("", viewsRouter)
app.use("/api/user", userRouter)
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api', sessionRouter)

app.listen(PORT, () => console.log(`Server on port ${PORT}`));