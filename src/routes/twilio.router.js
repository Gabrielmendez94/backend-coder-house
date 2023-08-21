import { Router } from "express";
import { sendingMessageFromTwilio } from "../controllers/twilio.controller.js";

const router = Router();

router.get('/', sendingMessageFromTwilio);

export default router;