import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import initializePassport from './config/passport.js';
import handlebars from "express-handlebars"
import __dirname from "./utils.js";
import MongoStore from "connect-mongo";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes/index.routes.js';
import passport from 'passport';
const PORT = 8081;
const app = express();


app.use(cors({ origin: 'http://localhost:4200', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',credentials: true, optionsSuccessStatus: 204, }));


mongoose.connect(process.env.MONGO_URL)
  .then(async () => console.log('Conexión exitosa a la base de datos'))
  .catch(error => console.error('Error de conexión:', error))

  
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+'/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname+'/public'))


app.use(express.json());
app.use(cookieParser(process.env.SIGNED_COOKIE))
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
// app.use(express.urlencoded({extended:true}));



initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use("", router)


app.listen(PORT, () => console.log(`Server on port ${PORT}`));