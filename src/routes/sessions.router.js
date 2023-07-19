import { Router } from 'express';
import userModel from '../dao/models/users.model.js';
import passport from 'passport';

const router = Router();

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: 'api/sessions/login' }), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

router.post('/logout', async (req, res)=>{
    req.session.destroy();
    res.send({status: 1, msg: 'Sesión cerrada correctamente'});
});

router.put('/restartpassword', async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).send({status: 'error', error: 'Incomplete Values'});
    const user = await userModel.findOne({email});
    if(!user) return res.status(404).send({status: 'error', error: 'User not found'});
    const newHashedPassword = createHash(password);
    await userModel.updateOne({_id: user._id}, {$set: {password: newHashedPassword}});
    res.send({status: 'success', message: 'Contraseña restaurada'});
})

export default router;