import { Router } from "express";
import {cartManager} from "../managers/cartManagerFS.js";

const router = Router();

router.post("/", (req, res) => {
        const newCart = cartManager.addCart();
        res.send(newCart);

})

router.get("/:cid", (req, res) => {
        const cartID = parseInt(req.params.cid);
        const cart = cartManager.getCartByID(cartID);
        res.send(cart);
})

router.post("/:cid/product/:pid", (req, res) => {
        const cartID = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const cartProd = cartManager.addProductCart(cartID, productId);
        res.send(cartProd);
})

export default router;