import config from "../config/config.js";
import {default as token} from 'jsonwebtoken';
import nodemailer from 'nodemailer';

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

export default {
    register,
    login,
    restartpassword,
    logout,
    github,
    githubCallback,
    currentUser
};