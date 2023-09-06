import { Router } from "express";
import { addingProductsToAnExistingCart, checkoutCart, createNewCart, emptyCart, getCartById, updateCartById, updatingProductsFromAnExistingCart } from "../controllers/carts.controller.js";
import  {autorizacion}  from "../utils.js";
const router = Router();

router.post("/", autorizacion(['user']), createNewCart);        
router.get("/:cid", autorizacion(['admin', 'user']), getCartById);
router.put('/:cid', autorizacion(['user']), updateCartById);
router.post("/:cid/product/:pid", autorizacion(['user']), addingProductsToAnExistingCart);
router.put('/:cid/product/:pid', autorizacion(['user']), updatingProductsFromAnExistingCart);
router.delete('/:cid/product/:pid', autorizacion(['user']), emptyCart);
router.post('/:cid/checkout', autorizacion(['user']), checkoutCart);

export default router;