import { Router } from "express";
import { addingProductsToAnExistingCart, checkoutCart, createNewCart, deleteCartById, emptyCart, getAllCarts, getCartById, updateCartById, updatingProductsFromAnExistingCart } from "../controllers/carts.controller.js";

const router = Router();

router.get("/", getAllCarts);
router.post("/", createNewCart);        
router.get("/:cid", getCartById);
router.put('/:cid', updateCartById);
router.delete('/:cid', deleteCartById);
router.post("/:cid/product/:pid", addingProductsToAnExistingCart);
router.put('/:cid/product/:pid', updatingProductsFromAnExistingCart);
router.delete('/:cid/product/:pid', emptyCart);
router.post('/:cid/checkout', checkoutCart);

export default router;