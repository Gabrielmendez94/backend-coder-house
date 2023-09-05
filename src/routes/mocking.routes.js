import {Router} from 'express';
import { productsFaker } from '../controllers/mocking.controller.js';

const router = Router();

router.get('/', productsFaker);

export default router;