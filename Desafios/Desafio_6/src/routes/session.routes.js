import { Router } from "express";
import { userModel } from "../models/User.model.js";

const sessionRouter = Router()

sessionRouter.post("/login", async (req, res) => {
    const {email, password} = req.body

    try {
        if (req.session.login) res.status(200).send({resultado: "Login ya existente"})
        
        const user = await userModel.findOne({email: email})

        if (user) {
            if (user.password == password) {
               req.session.login = true
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

sessionRouter.get('/logout', (req, res) => {
    if (req.session.login) {
        req.session.destroy()
    }
    res.redirect('/login', 200, { resultado: 'Usuario deslogueado' })
})

export default sessionRouter