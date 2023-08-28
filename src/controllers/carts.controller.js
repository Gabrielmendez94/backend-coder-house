import CartService from "../services/carts.service.js";

const cartService = new CartService();

export const getAllCarts = async (req,res) => {
    try{
        const cartMgd = await cartService.getCarts();      
        res.status(201).send(cartMgd);
    }catch(error){
        res.status(400).send({ status: 0, msg: error.message });
    }
}

export const createNewCart = async (req, res) => {
        try{
                const createCart = await cartService.createCart();
                res.status(201).send({ status: 1, msg: 'Cart added successfully', cartId: newCart._id });
        } catch(error){
                res.status(500).send({ status: 0, msg: error.message });
        }
}

export const getCartById = async (req, res) => {
    try{
            const id = req.params.cid;
            const cartId = await cartService.getCartById(id);
            res.json({ status: 1, cartId });
    }catch(error){
        res.status(500).json({ status: 0, error: error.message });
    }
}

export const updateCartById = async (req, res)=>{
    try{
            const updatedProduct = req.body.products;
            const cartId = (req.params.cid);
            const cartProd = await cartService.addProductsToCart(cartId, updatedProduct);
            res.status(201).send({ status: 1, msg: 'Cart updated successfully', cartProducts: cart.products });
    }catch(error){
            res.status(500).send({ status: 0, msg: error.message });
    }
}

export const deleteCartById = async (req, res)=>{
    try{
            const id = (req.params.cid);
            const cartId = await cartManager.deleteCartId(id);
            res.send(cartId);
    }catch(error) {
            console.log(error);
            res.status(500).send("Error al eliminar los productos del carrito");
          }
}

export const addingProductsToAnExistingCart = async (req, res) => {
        try{
                const cartId = (req.params.cid);
                const productId = (req.params.pid);
                const cartProd = await cartService.addToCart(cartId, productId);
                res.status(201).send({ status: 1, msg: 'Product added to cart successfully', cartProd });
        }catch(error){
                res.status(500).send({ status: 0, msg: error.message })
        }
}

export const updatingProductsFromAnExistingCart = async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const productId = req.params.productId;
        const quantity = req.body.quantity;
        const cart = await cartService.updateProductQuantity(cartId, productId, quantity);
        res.status(201).send({ status: 1, msg: 'Product quantity updated successfully', cart });
    } catch (error) {
        res.status(500).send({ status: 0, msg: error.message });
    }
};

export const emptyCart = async (req, res) => {
        const cartId = req.params.cartId;
    
        try {
            const emptiedCart = await cartService.emptyCart(cartId);
            res.status(201).send({ status: 1, msg: 'Cart successfully emptied', cart: emptiedCart });
        } catch (error) {
            res.status(500).json({ status: 0, error: error.message });
        }
    };
    
    export const checkoutCart = async (req, res) => {
        const cartId = req.params.cartId;
        try {
            const purchaseCartResult = await cartService.checkoutCart(cartId, req.user.email);
            res.status(201).send({ status: 1, msg: 'Cart successfully purchased', purchaseCartResult: purchaseCartResult });
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 0, error: error.message });
        }
    };