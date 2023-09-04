import CartService from "../services/carts.service.js";

const cartService = new CartService();

export const createNewCart = async (req, res, next) => {
        try{
                const newCart = await cartService.createCart();
                res.status(201).send({ status: 1, msg: 'Cart added successfully', cartId: newCart._id });
        } catch(error){
            next(error);
        }
}

export const getCartById = async (req, res, next) => {
    try{
            const id = req.params.cid;
            const cartId = await cartService.getCartById(id);
            res.json({ status: 1, cartId });
    }catch(error){
        next(error);
    }
};

export const updateCartById = async (req, res, next)=>{
    try{
        const cartId = req.params.cartId;
        const products = req.params.products;
        const cart = await cartService.addProductsToCart(cartId, products);
            res.status(201).send({ status: 1, msg: 'Cart updated successfully', cartProducts: cart.products });
    }catch(error){
        next(error);
    }
}

export const addingProductsToAnExistingCart = async (req, res, next) => {
    try{
            const cartId = req.params.cid;
            const productId = req.params.pid;
            const cartProd = await cartService.addToCart(cartId, productId);
            res.status(201).send({ status: 1, msg: 'Product added to cart successfully', cartProd });
    }catch(error){
        next(error);
    }
}

export const removeProductFromCart = async (req, res, next) =>{
    try{
        const cartId = req.params.cartId;
        const productId = req.params.productId;
        const cart = await cartService.removeFromCart(cartId, productId);
        res.status(201).send({ status: 1, msg: 'Product deleted from cart successfully', cart });
    }catch(error){
        next(error);
    }
};

export const updatingProductsFromAnExistingCart = async (req, res, next) => {
    try {
        const cartId = req.params.cartId;
        const productId = req.params.productId;
        const quantity = req.body.quantity;
        const cart = await cartService.updateProductQuantity(cartId, productId, quantity);
        res.status(201).send({ status: 1, msg: 'Product quantity updated successfully', cart });
    } catch (error) {
        next(error)
    }
};

export const emptyCart = async (req, res, next) => {
        const cartId = req.params.cartId;
    
        try {
            const emptiedCart = await cartService.emptyCart(cartId);
            res.status(201).send({ status: 1, msg: 'Cart successfully emptied', cart: emptiedCart });
        } catch (error) {
            next(error);
        }
    };
    
    export const checkoutCart = async (req, res, next) => {
        const cartId = req.params.cartId;
        try {
            const purchaseCartResult = await cartService.checkoutCart(cartId, req.user.email);
            res.status(201).send({ status: 1, msg: 'Cart successfully purchased', purchaseCartResult: purchaseCartResult });
        } catch (error) {
            next(error);
        }
    };