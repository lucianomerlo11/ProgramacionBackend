import { Router } from "express";

const viewsRouter = Router()

viewsRouter.get("/login", (req, res) => {
    res.render("login")
})

viewsRouter.get("/register", (req, res) => {
    res.render("register")
})

export default viewsRouter