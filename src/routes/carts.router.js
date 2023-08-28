import { Router } from "express";
import { addingProductsToAnExistingCart, checkoutCart, createNewCart, deleteCartById, emptyCart, getAllCarts, getCartById, updateCartById, updatingProductsFromAnExistingCart } from "../controllers/carts.controller.js";
import  {autorizacion}  from "../utils.js";
const router = Router();

router.get("/", autorizacion(['admin', 'user']), getAllCarts);
router.post("/", autorizacion(['user']), createNewCart);        
router.get("/:cid", autorizacion(['admin', 'user']), getCartById);
router.put('/:cid', autorizacion(['user']), updateCartById);
router.delete('/:cid', autorizacion(['user']), deleteCartById);
router.post("/:cid/product/:pid", autorizacion(['user']), addingProductsToAnExistingCart);
router.put('/:cid/product/:pid', autorizacion(['user']), updatingProductsFromAnExistingCart);
router.delete('/:cid/product/:pid', autorizacion(['user']), emptyCart);
router.post('/:cid/checkout', autorizacion(['user']), checkoutCart);

export default router;