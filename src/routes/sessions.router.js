import { Router } from 'express';
import { passportCall } from '../utils.js';
import config from '../config/config.js';
import cookieParser from 'cookie-parser';
import sessionsController, { UsersController } from '../controllers/sessions.controller.js';

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
router.get('/send-recover-email/:email', async (req, res)=>{
    await UsersController.sendEmail(req.params.email);
    res.send({message: 'Mail sent!'});
})

export default router;