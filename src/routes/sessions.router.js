import { Router } from 'express';
import { createHash, passportCall, validarToken } from '../utils.js';
import config from '../config/config.js';
import cookieParser from 'cookie-parser';
import sessionsController, { UsersController } from '../controllers/sessions.controller.js';
import userModel from '../dao/models/users.model.js';

const router = Router();
const usersController = new UsersController();
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
    await usersController.sendEmail(req.params.email);
    res.send({message: 'Mail sent!'});
})
router.get('/restore-pass/:token', validarToken, (req, res)=>{
    res.render('restore-pass', {token: req.params.token});
});
router.post('/pass-change/:token', validarToken, async (req, res)=>{
    if(!req.params.token){
        res.redirect('/send-recover-email/:email');
    }
    const password = req.body;
    console.log(password);
    const email = req;
    const hashedPassword = createHash(password);
    await userModel.updateOne({email: email}, {$set: {password: hashedPassword}});
    res.send({message: 'Password Changed'});
});


export default router;