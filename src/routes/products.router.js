import { Router } from "express";
import {nuevoProducto} from '../productManager.js';

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
        const {title, description, code, price, status, stock, category, thumbnails} = req.body;
        nuevoProducto.addProduct(title, description, code, price, status, stock, category, thumbnails);
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
    if(!product) res.status(404).send('Producto no encontrado');    
    product = {...product, ...dataToUpdate};
    res.send(product);
})

router.delete('/:pid', (req, res)=>{
    const productId = parseInt(req.params.pid);
    let productToDelete = nuevoProducto.deleteProduct(productId);
    if(!productToDelete) res.send("Eliminado")
})

export default router;