import { Router } from 'express';
import { createNewMessage, getAllMessages } from '../controllers/messages.controller.js';

const router = Router();

router.get('/', getAllMessages);
router.post('/', createNewMessage);

export default router;