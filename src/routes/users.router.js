import { Router } from "express";
import { updateUserDocuments, updateUserRole, getUsers, deleteInactiveUsers} from "../controllers/users.controller.js";

const router = new Router();

router.post('/premium/:uid', updateUserRole);
router.post('/:uid/documents', updateUserDocuments);
router.get('/', getUsers);
router.delete('/', deleteInactiveUsers)

export default router;