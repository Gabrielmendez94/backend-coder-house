import config from "../config/config.js";
import {default as token} from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import UserManager from "../dao/mongo/usersManager.js";
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
/*
const changeUserRole = (req, res) =>{
    try{
        const userId = req.params.uid;
        const updateRole = req.body.role;

        if(["user", "premium"].includes(updateRole)){
            const updateUser = userModel.findByIdAndUpdate(
                userId,
                {userRole: updateRole},
                {new: true}
            );

            if(updateUser){
                res.status(200).json(updateUser);
            }else{
                res.status(404).send("User not found");
            }
        }else{
            res.status(400).send("Rol not was accepted. Choose through the following options: user or premium");
        }
    }catch(error){
        console.log(error.message)
    }
}*/

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

    usersManager;

    constructor(){
        this.usersManager = new UserManager();
    }
    async sendEmail(email){
        try{
            const jwt = this.createJwt(email)
            transport.sendMail({
                from:`Coder <${config.mailing.auth.user}>`,
                to:email,
                subject: 'Recuperar Pass',
                html: `<h1>Para recuperar tu pass, haz click en el boton de abajo</h1>
                        <hr>
                        <a href="http://${BASE_URL}:${PORT}/api/sessions/restore-pass/${jwt}">CLICK AQUI</a>
                `,
            });
        } catch(e){
            res.json({error: e});
        }
    }

    async getUserByEmail(email){
        try{
            return await this.usersManager.getUserByEmail(email);
        }catch(e){
            res.json({error: e});
        }
    }

    createJwt(email){
        return token.sign({email}, PRIVATE_KEY, {expiresIn: '1h'})

    }
    updateUser(){
        console.log('Password changed');
    }
// TO DO : Mover toda la lógica relacionada al usuario al users.controller.js;
   async setLastConnection(email){
        try{
            const user = await this.usersManager.getUserByEmail(email);
            if (!user) throw new Error('User not found');
            await this.usersManager.setLastConnection(user);
        }catch(e){
            throw new Error(e);
        }
    }

    async updateUserDocuments(id, files){
        try{
            const user = await this.usersManager.getUserById(id);
            const documets = user.documents || [];

            const newDocuments = [
                ...documets,
                ...files.map(file => ({name: file.originalname, reference: file.path}))
            ];
            
            return await user.updateOne({documents: newDocuments});
        }catch(e){
            res.json({error: e});
        }
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