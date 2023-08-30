import { Router } from 'express';
import messagesController from '../controllers/messages.controller.js';
import { autorizacion } from '../utils.js';

const router = Router();

router.get('/', autorizacion(['admin', 'user']), messagesController.getMessages);
router.post('/', autorizacion(['user']), messagesController.addMessage);

export default router;