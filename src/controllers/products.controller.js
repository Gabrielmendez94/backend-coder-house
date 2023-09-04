import ProductManager from "../dao/mongo/productManager.js";
import ProductService from "../services/products.service.js";

const productService = new ProductService(), newProduct = new ProductManager();
/*
export const getAllProducts = async(req, res)=>{

    const usersId = parseInt(req.query.limit);
     const products = await newProduct.getProducts();
     if(!usersId){
         res.send(JSON.stringify(products))    
     } else{
         const product = products.slice(0,usersId);;
             res.send(JSON.stringify(product))
     }
 }*/

export const getAllProducts = async (req, res, next) => {
    try {
        const { limit = 10, page = 1, sort, category, available } = req.query;
        // Get baseUrl for navigation links
        const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`;
        const products = await productService.getProducts(limit, page, sort, category, available, baseUrl);
        res.send({ status: 1, ...products });
    } catch (error) {
        next(error);
    }
};

 export const getProductByID = async (req,res, next)=>{
    try {
        const productId = req.params.pid;
        const product = await productService.getProductById(productId);
        res.send({status: 1, product: product});
    } catch(error){
        next(error);
    }
}

export const createNewProduct = async (req, res, next)=>{ 
    try{
        const newProducts = req.body;
        const files = req.files;
        const filesUrls = files.map(file => `http://localhost:8080/files/uploads${file.filename}`);
        if(filesUrls.length > 0) {
            newProducts.thumbnail = filesUrls;
        } else{
            newProducts.thumbnail = [];
        }
        const newProduct = await productService.addProduct(newProducts); 
//        io.emit('addProducts', productAdded);
        res.send({ status: 1, msg: 'Product added successfully', product: newProduct });
    }
    catch (error){
        next(error);
    }
}

export const updateProductById = async(req, res, next)=>{
    try{
        const productId = req.params.pid;
        const dataToUpdate = req.body;
        if(Object.keys(req.body).length === 0) throw new Error('Empty request body');
        const updatedProduct = await productService.updateProduct(productId, dataToUpdate);
        res.send({ status: 1, msg: 'Product updated successfully', product: updatedProduct });   
    } catch(error){
        next(error);
    }
//    io.emit('addProducts', productAdded);
}

export const deleteProductById = async (req, res, next)=>{
    try{
        const productId = req.params.pid;
        await productService.deleteProduct(productId);
        res.send({ status: 1, msg: 'Product deleted successfully' });
    } catch (error){
        next(error);
    }
//    io.emit('addProducts', productAdded);
}