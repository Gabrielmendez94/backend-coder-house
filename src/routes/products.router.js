import { Router } from "express";
import { createNewProduct, deleteProductById, getAllProducts, getProductByID, updateProductById } from "../controllers/products.controller.js";

const router = Router();

router.get('/', getAllProducts);
router.get('/:pid', getProductByID);
router.post('/', createNewProduct);
router.put('/:pid', updateProductById);
router.delete('/:pid', deleteProductById);

export default router;