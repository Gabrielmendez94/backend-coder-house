import { Router } from "express";
import {nuevoProducto} from '../productManager.js';
import { io } from "../app.js";

const router = Router();

router.get('/', (req, res)=>{
    const usersId = parseInt(req.query.limit);
    const products = nuevoProducto.getProducts();
    if(!usersId){
        res.send(JSON.stringify(products))    
    } else{
        const product = products.slice(0,usersId);;
            res.send(JSON.stringify(product))
    }
})

router.get('/:pid', (req,res)=>{
    const productId = parseInt(req.params.pid);
    const product = nuevoProducto.getProductById(productId);
    if(product){
        res.send(JSON.stringify(product));
    }else{
        res.send("Producto no encontrado");
    }
})

router.post('/',  (req, res)=>{
    try{
        const {title, description, price, thumbnail, code, stock} = req.body;
        nuevoProducto.addProduct(title, description, price, thumbnail, code, stock);
        const productAdded = nuevoProducto.getProducts();
        io.emit('addProducts', productAdded);
        res.send("Producto agregado")    
    }
    catch (error){
        res.status(500).send('Error en la obtención de los datos');
    }
})

router.put('/:pid', (req, res)=>{
    const productId = parseInt(req.params.pid);
    const dataToUpdate = req.body;
    let product = nuevoProducto.getProductById(productId);
    const productAdded = nuevoProducto.getProducts();
    if(!product) res.status(404).send('Producto no encontrado');    
    product = {...product, ...dataToUpdate};
    res.send(product);
    io.emit('addProducts', productAdded);
})

router.delete('/:pid', (req, res)=>{
    const productId = parseInt(req.params.pid);
    let productToDelete = nuevoProducto.deleteProduct(productId);
    const productAdded = nuevoProducto.getProducts();
    io.emit('addProducts', productAdded);
})

export default router;