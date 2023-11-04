import { Router } from "express";
import { cartModel } from "../models/Cart.model.js";
import { productModel } from "../models/Product.model.js";

const cartRouter = Router()

cartRouter.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const cart = await cartModel.findById(id)
        if (cart)
            res.status(200).send({ respuesta: 'OK', payload: cart })
        else
            res.status(404).send({ respuesta: 'Error en consultar Carrito', payload: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consulta carrito', payload: error })
    }
})

// This endpoint create a new cart
cartRouter.post('/', async (req, res) => {

    try {
        const cart = await cartModel.create({})
        res.status(200).send({ respuesta: 'OK', payload: cart })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en crear Carrito', payload: error })
    }
})

// This endpoint add a product to the cart
cartRouter.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body

    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            const prod = await productModel.findById(pid) //Busco si existe en LA BDD, no en el carrito

            if (prod) {
                const indice = cart.products.findIndex(item => item.id_prod == pid) //Busco si existe en el carrito
                if (indice != -1) {
                    cart.products[indice].quantity = quantity //Si existe en el carrito modifico la cantidad
                } else {
                    cart.products.push({ id_prod: pid, quantity: quantity }) //Si no existe, lo agrego al carrito
                }
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart) //Actualizar el carrito
                res.status(200).send({ respuesta: 'OK', payload: respuesta })
            } else {
                res.status(404).send({ respuesta: 'Error en agregar producto Carrito', payload: 'Produt Not Found' })
            }
        } else {
            res.status(404).send({ respuesta: 'Error en agregar producto Carrito', payload: 'Cart Not Found' })
        }

    } catch (error) {
        console.log(error)
        res.status(400).send({ respuesta: 'Error en agregar producto Carrito', payload: error })
    }
})

export default cartRouter