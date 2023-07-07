import { Router } from "express";
import ProductManager from "../managers/productManager.js";
//import { io } from "../app.js";

const router = Router();
const newProduct = new ProductManager(); 

router.get('/', async(req, res)=>{

   const usersId = parseInt(req.query.limit);
    const products = await newProduct.getProducts();
    if(!usersId){
        res.send(JSON.stringify(products))    
    } else{
        const product = products.slice(0,usersId);;
            res.send(JSON.stringify(product))
    }
})

router.get('/:pid', async (req,res)=>{
    try {
        const productId = req.params.pid;
        const product = await newProduct.getProductById(productId);
        res.send(product);
    } catch(error){
        res.status(404).send({msg: error.message});
    }
})

router.post('/', async (req, res)=>{
    try{
        let newProducts = req.body;
        await newProduct.addProduct(newProducts); 
//        io.emit('addProducts', productAdded);
        res.send("Producto agregado")
    }
    catch (error){
        res.status(500).send('Error en la obtención de los datos');
    }
})

export default router;


router.put('/:pid', async(req, res)=>{
    try{
        const productId = req.params.pid;
        const dataToUpdate = req.body;
        if(Object.keys(req.body).length === 0) throw new Error('Empty request body');
        const uptatedProduct = await newProduct.updateProduct(productId, dataToUpdate);
        res.send(uptatedProduct)    
    } catch(error){
         res.status(500).send({status: 0, msg: error.message})
    }
//    io.emit('addProducts', productAdded);
})

router.delete('/:pid', async (req, res)=>{
    try{
        const productId = req.params.pid;
        console.log
        await newProduct.deleteProduct(productId);
        res.send('Product deleted successfully');
    } catch (error){
        res.status(404).send('Error');
    }
//    io.emit('addProducts', productAdded);
})/*
*/