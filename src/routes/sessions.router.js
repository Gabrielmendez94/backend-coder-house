import { Router } from 'express';
<<<<<<< HEAD
import passport from 'passport';
=======
import userModel from '../dao/models/users.model.js';
import passport/*, { session }*/ from 'passport';
import { createHash } from '../utils.js';
import cookieParser from 'cookie-parser';

>>>>>>> 36a3f482fbf63cd6ad9eb74f6f4ccb83625a1580
const router = Router();
router.use(cookieParser());

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: 'api/sessions/login' }), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});
/*
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists) return res.status(400).send({ status: "error", error: "User already exists" });
    const user = {
        first_name,
        last_name,
        email,
        age,
        password 
    }
    await userModel.create(user);
    res.send({ status: "success", message: "User registered" });
})*/

router.post('/login', passport.authenticate('login', {session: false}), (req, res) => {
    res.cookie('coderCookieToken', req.user, {httpOnly: true}).send({status: 'Success', message: 'Cookie set'});
    /*const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) return res.status(400).send({ status: "error", error: "User does not exists" });

    if (user.password !== password) {
        return res.status(400).send({ status: "error", error: "User exists but password is incorrect" });
    }
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }

    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
*/})

router.post('/register', passport.authenticate('register', {session: false}), (req, res)=>{
    res.send(req.user);
});

router.get('/current', passport.authenticate('current', {session: false}), (req, res)=>{
    delete req.user.user.password;
    res.send(req.user.user);
})



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