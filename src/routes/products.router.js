import { Router } from "express";
import uploader from "../utils/multer.js";
import { createNewProduct, deleteProductById, getAllProducts, getProductByID, updateProductById } from "../controllers/products.controller.js";
import { autorizacion } from "../utils.js";

const router = Router();

router.get('/', autorizacion(['admin', 'user']), getAllProducts);
router.get('/:pid', autorizacion(['admin', 'user']), getProductByID);
router.post('/', createNewProduct);
router.put('/:pid', autorizacion('admin'), updateProductById);
router.delete('/:pid', autorizacion('admin'), deleteProductById);

export default router;