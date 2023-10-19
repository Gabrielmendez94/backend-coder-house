import { Router } from "express";
import { updateUserDocuments, updateUserRole } from "../controllers/users.controller.js";

const router = new Router();

router.post('/premium/:uid', updateUserRole);
router.post('/:uid/documents', updateUserDocuments);

export default router;