import express from 'express';
import ProductManager from '../managers/productManager.js';
import productModel from '../dao/models/products.model.js';
import CartManager from '../managers/cartManager.js';
import mongoose from 'mongoose';

const router = express.Router();

const newProducts = new ProductManager();
const cartManager = new CartManager();

router.get('/', (req, res)=>{
    res.render('home', {
        newProducts,
        style: 'style.css'
    });
})

router.get('/products', async (req, res)=>{
    const {page} = req.query;
    const products = await productModel.paginate(
        {},
        {
            limit: 5,
            lean: true,
            page: page ?? 1
        }
    )
    res.render('products', {products});
})

router.get('/carts/:cid', async (req, res)=>{
    try {
        const cartId = req.params.cid;
        const cart = await cartManager.getCartByID(cartId);
        res.render('carts', {
            title: 'Pastelería Susi',
            cart: cart            
        })
          } catch (error) {
            throw new Error (error)
          }
})


router.get('/realtimeproducts', (req, res)=>{
    res.render('realTimeProducts',{
        style: 'style.css'
    })
})

router.get('/webchat', (req,res)=>{
    res.render('chat', { style: 'chat.css', title: 'Tienda de ropa'});
})

export default router;