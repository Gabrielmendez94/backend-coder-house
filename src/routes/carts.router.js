import { Router } from "express";
import { addingProductsToAnExistingCart, createNewCart, deleteCartById, deletingProductsFromAnExistingCart, getAllCarts, getCartById, updateCartById, updatingProductsFromAnExistingCart } from "../controllers/carts.controller.js";

const router = Router();

router.get("/", getAllCarts);
router.post("/", createNewCart);        
router.get("/:cid", getCartById);
router.put('/:cid', updateCartById);
router.delete('/:cid', deleteCartById);
router.post("/:cid/product/:pid", addingProductsToAnExistingCart);
router.put('/:cid/product/:pid', updatingProductsFromAnExistingCart);
router.delete('/:cid/product/:pid', deletingProductsFromAnExistingCart);

export default router;