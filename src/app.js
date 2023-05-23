import  express  from 'express';
import {nuevoProducto} from './segundoEntregable.js'

const app = express();

app.get('/products', (req, res)=>{
    const usersId = parseInt(req.query.limit);
    const products = nuevoProducto.getProducts();
    if(!usersId){
        res.send(JSON.stringify(products))    
    } else{
        const product = products.slice(0,usersId);;
            res.send(JSON.stringify(product))
    }
});

app.get('/products/:id', (req,res)=>{
    const productId = parseInt(req.params.id);
    const product = nuevoProducto.getProductById(productId);
    if(product){
        res.send(JSON.stringify(product));
    }else{
        res.send("Producto no encontrado");
    }
})

app.listen(8080, ()=>{
    console.log('Servidor escuchando en el puerto 8080')
})