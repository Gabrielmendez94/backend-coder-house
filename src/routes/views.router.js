import express from 'express';
import ProductManager from '../managers/productManager.js';
const router = express.Router();

const newProducts = new ProductManager();

router.get('/', (req, res)=>{
    res.render('home', {
        newProducts,
        style: 'style.css'
    });
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