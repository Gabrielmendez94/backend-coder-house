import { Router } from "express";
import { sendingEmail } from "../controllers/mailing.controller.js";

const router = Router();

router.get('/mail-with-image', sendingEmail);

export default router;