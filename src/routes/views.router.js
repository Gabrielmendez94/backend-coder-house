import express from 'express';
import {nuevoProducto} from '../productManager.js';

const router = express.Router();

const newProducts = nuevoProducto.getProducts();

router.get('/', (req, res)=>{
    res.render('home', {
        newProducts,
        style: 'style.css'
    });
})

router.get('/realtimeproducts', (req, res)=>{
    res.render('realTimeProducts',{
        newProducts,
        style: 'style.css'
    })
})

router.delete('/realtimeproducts/:id', (req, res)=>{
    const productId = parseInt(req.params.id);
    nuevoProducto.deleteProduct(productId);
})

export default router;