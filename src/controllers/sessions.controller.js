import config from "../config/config.js";
import {default as token} from 'jsonwebtoken';
import nodemailer from 'nodemailer'

const COOKIE_PASS = config.cookie.cookiePass, PRIVATE_KEY = config.jwtAuth.privateKey, BASE_URL = config.baseurl, PORT = config.port;

const register = (req, res)=>{
    res.send({ status: 1, msg: "New user registered" , user: req.user});
}

const login = (req, res)=>{
    res.cookie(COOKIE_PASS, req.user, {httpOnly: true}).send({ status: 1, msg: 'User successfully logged in', jwt: req.user });
};

const restartpassword = (req, res) => {
    res.send({ status: 1, msg: 'Password successfully reseted.' });
};

const logout = (req, res) => {
    const jwtCookie = req.cookies[COOKIE_PASS];
    if (!jwtCookie) {
        return res.status(400).send({ status: 0, msg: 'User is not logged in.' });
    }    
    res.clearCookie(COOKIE_PASS).send({ status: 1, msg: 'User successfully logged out' });
};

const github = (req, res) => {
};

const githubCallback = (req, res) => {
    res.cookie(COOKIE_PASS, req.user, { httpOnly: true }).redirect('/products');
};

const currentUser = (req, res) => {
    res.send({ status: 1, msg: 'User logged in', user: req.user });
};

//Configurando mailing
const mailConfig = {
    service: config.mailing.service,
    port: config.mailing.port,
    auth: {
        user: config.mailing.auth.user,
        pass: config.mailing.auth.pass,
    },
}

const transport = nodemailer.createTransport(mailConfig);

export class UsersController{
    async sendEmail(email){
        try{
            const jwt = this.createJwt(email)
            transport.sendMail({
                from:`Coder <${config.mailing.auth.user}>`,
                to:email,
                subject: 'Recuperar Pass',
                html: `<h1>Para recuperar tu pass, haz click en el boton de abajo</h1>
                        <hr>
                        <a href="http://${BASE_URL}:${PORT}/restorepass/${jwt}">CLICK AQUI</a>
                `,
            });
        } catch(e){
            res.json({error: e});
        }
    }

    createJwt(email){
        return token.sign({email}, PRIVATE_KEY, {expiresIn: '1h'})

    }
}

export default {
    register,
    login,
    restartpassword,
    logout,
    github,
    githubCallback,
    currentUser
};