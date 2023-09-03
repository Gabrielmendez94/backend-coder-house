import { Router } from 'express';
import { passportCall } from '../utils.js';
import config from '../config/config.js';
import cookieParser from 'cookie-parser';
import sessionsController from '../controllers/sessions.controller.js';

const router = Router();
const PRIVATE_KEY = config.jwtAuth.privateKey;
router.use(cookieParser(PRIVATE_KEY));

router.post('/register', passportCall('register'), sessionsController.register);
router.post('/login', passportCall('login', {session: false}), sessionsController.login);
router.put('/restartpassword', passportCall('restartpassword'), sessionsController.restartpassword);
router.post('/logout', sessionsController.logout);
router.get('/github', passportCall('github', {scope: ['user: email']}), sessionsController.github);
router.get('/githubcallback', passportCall('github'), sessionsController.githubCallback);
router.get('/current', passportCall('jwt', {session: false}), sessionsController.currentUser);

export default router;