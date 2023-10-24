import { Router } from "express";
import { updateUserDocuments, updateUserRole, getUsers} from "../controllers/users.controller.js";

const router = new Router();

router.post('/premium/:uid', updateUserRole);
router.post('/:uid/documents', updateUserDocuments);
router.get('/', getUsers /*async (req, res)=>{
    // Crear Lógica para obtener todos los usuarios
}*/)
router.delete('/', async (req, res) =>{
    // Crear Lógica para eliminar todos los usuarios que superen 2 días de inactividad
})

export default router;