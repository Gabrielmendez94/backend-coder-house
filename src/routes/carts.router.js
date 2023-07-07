import { Router } from "express";
import CartManager from "../managers/cartManager.js";

const router = Router();
const cartManager = new CartManager();

router.get("/", async (req,res) => {
        const cartMgd = await cartManager.getCart();      
        if(cartMgd) {
          res.send(cartMgd)
        }else {
          res.status(400).send("no se ha podido encontrar los carritos")
        }
})

router.post("/", async (req, res) => {

        let createCart = await cartManager.addCart();
        if(createCart){
                res.send('Se creó el carrito')
        } else{
                res.status(400).send('Ocurrió un error en la creación del carrito')
        }
})

router.get("/:cid", async (req, res) => {
        try{
                const id = req.params.cid;
                const cartId = await cartManager.getCartByID(id);
                res.send(cartId);
        }catch(error){
                res.status(404).send({msg: error.message});
        }
});

router.put('/:cid', async (req, res)=>{
        try{
                const updatedProduct = req.body.products;
                const cartId = (req.params.cid);
                const cartProd = await cartManager.actCartId(cartId, updatedProduct);
                res.send(cartProd);
        }catch{
                res.status(500).send("no se ha encontrado el carrito solicitado")
        }

});

router.delete('/:cid', async (req, res)=>{
        try{
                const id = (req.params.cid);
                const cartId = await cartManager.deleteCartId(id);
                res.send(cartId);
        }catch(error) {
                console.log(error);
                res.status(500).send("Error al eliminar los productos del carrito");
              }
})

router.post("/:cid/product/:pid", async (req, res) => {
        const cartId = (req.params.cid);
        const productId = (req.params.pid);
        const cartProd = await cartManager.addProductsToCart(cartId, productId);
        if(cartProd){
                res.send('Product added');
        }else{
                res.status(400).send("no se ha podido encontrar los carritos");
        }
});

router.put('/:cid/product/:pid', async(req, res)=>{
        try {
                const updatedProduct = req.body
                const cartId = (req.params.cid);
                const productId = (req.params.pid);
              
                const changeCart = await cartManager.actProductsToCart(cartId, productId, updatedProduct);
              
                if (changeCart) {
                  res.send("se ha añanido el producto")
                } else {
                  res.status(400).send("ha ocurrido un error al agregar el producto al carrito")
                }
              } catch (error) {
                throw new Error ("ocurrio un error en el server")
              }
})

router.delete('/:cid/product/:pid', async (req, res)=>{
        try{
                const cartId = (req.params.cid);
                const productId = (req.params.pid);
                const deleteFromCart = await cartManager.deleteProductsFromCart(cartId, productId);
                res.send('Product deleted');
        }catch{
                res.status(400).send('Ha ocurrido un error al eliminar el producto del carrito');
        }
})

export default router;