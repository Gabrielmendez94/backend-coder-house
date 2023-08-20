import { Router } from 'express';
import { chatWeb, login, redirectioning, register, resetPswd, viewCartsById, viewProducts, viewProductsInRealTime } from '../controllers/views.controller.js';

const router = Router();

router.get('/products', viewProducts);
router.get('/carts/:cid', viewCartsById);
router.get('/realtimeproducts', viewProductsInRealTime);
router.get('/webchat', chatWeb);
router.get('/register', register);
router.get('/login', login);
router.get('/', redirectioning);
router.get('/resetpassword', resetPswd);

export default router;