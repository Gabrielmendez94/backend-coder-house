import  express  from 'express';
import {nuevoProducto} from './segundoEntregable.js'

const app = express();

app.get('/products', (req, res)=>{
    const products = nuevoProducto.getProducts();
    res.send(JSON.stringify(products))
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