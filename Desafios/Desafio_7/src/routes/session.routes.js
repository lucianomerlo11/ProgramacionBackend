import { Router } from "express";
import { userModel } from "../models/User.model.js";
import passport from "passport";

const sessionRouter = Router()



sessionRouter.post("/login", passport.authenticate('login'), async (req, res) => {
    const {email, password} = req.body

    try {
        if (req.session.login) res.status(200).send({resultado: "Login ya existente"})

        const user = await userModel.findOne({email: email})

        if (user) {
            if (user.password == password) {
               req.session.login = true
               req.session.user = {user: user}
                res.redirect('/api/products', 200, {'info': 'user'})
            }else{
                res.status(401).send({resultado: 'Constraseña no valida', mensaje: password})
            }
        }else{
            res.status(404).send({ resultado: 'Not Found', message: user })
        }
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