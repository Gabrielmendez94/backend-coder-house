import { Router } from "express";
import { changeUserRole } from "../controllers/users.controller.js";

const router = new Router();

router.post('/premium/:uid', changeUserRole);

export default router;