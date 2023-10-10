import { Router } from "express";
import { userModel } from "../models/User.model.js";
import passport from "passport";

const sessionRouter = Router()



sessionRouter.post("/login", passport.authenticate('login'), async (req, res) => {
    const {email, password} = req.body

    try {
        if (!req.user) {
            return res.status(401).send({ mensaje: "Usuario invalido" })
        }

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email
        }

        res.redirect('/api/products', 200, {payload: req.user})
    } catch (error) {
        res.status(400).send({ error: `Error en Login: ${error}` })
    }
})

sessionRouter.post('/register', passport.authenticate('register'), async (req, res) => {
    try {
        if(!req.user) return res.status(400).send({mensaje: "Usuario ya existente"})

        res.redirect('/login', 200, {'info': 'user created'})
    } catch (error) {
        res.status(500).send({ mensaje: `Error al registrar usuario ${error}` })
    }
})

sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {

})

sessionRouter.get('/githubCallback', passport.authenticate('github'), async (req, res) => {
    req.session.user = req.user
    res.status(200).send({ mensaje: 'Usuario logueado' })
})

sessionRouter.get('/logout', (req, res) => {
    if (req.session.login) {
        req.session.destroy()
    }
    //res.status(200).send({ resultado: 'Usuario deslogueado' })
    res.redirect('/login', 200, { resultado: 'Usuario deslogueado' })
})


export default sessionRouter