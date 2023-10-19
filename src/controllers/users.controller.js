import UserManager from "../dao/mongo/usersManager.js";
import {default as token} from 'jsonwebtoken';
import config from "../config/config.js";
import nodemailer from 'nodemailer';

const PRIVATE_KEY = config.jwtAuth.privateKey, BASE_URL = config.baseurl, PORT = config.port;


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

// TO DO : Crear funciones independientes en lugar de métodos

const usersManager = new UserManager();

export const sendEmail = (req, res)=>{
    try{
        const email = req.params.email;
        const jwt = createJwt(email);
        console.log(jwt)
    
        transport.sendMail({
            from:`Coder <${config.mailing.auth.user}>`,
            to:email,
            subject: 'Recuperar Pass',
            html: `<h1>Para recuperar tu pass, haz click en el boton de abajo</h1>
                    <hr>
                    <a href="http://${BASE_URL}:${PORT}/api/sessions/restore-pass/${jwt}">CLICK AQUI</a>
            `,
        });
        res.send('Mail sent');
    }catch(e){
        res.json({error: e});
    }
}

const createJwt = (email) =>{
    return token.sign({email}, PRIVATE_KEY, {expiresIn: '1h'})
}

export const updateUserDocuments = async (req, res) =>{
    try{
        const uid = req.params.uid;
        const user = await usersManager.getUserById(uid);
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

export const setLastConnection = async (req, res) =>{
    try{
        const email = req.params.email;
        const user = await usersManager.getUserByEmail(email);
        if (!user) throw new Error('User not found');
        await usersManager.setLastConnection(user);
    }catch(e){
        throw new Error(e);
    }
}

export const getUserByEmail = async (req, res) =>{
    try{
        const email = req.params.email;
        return await usersManager.getUserByEmail(email)    
    }catch(e){
        res.json({error: e});
    }
}

export const updateUserRole = async (req, res) =>{
    try{
        const userId = req.params.uid;
        const user = await usersManager.getUserById(userId); 
    
        if(user.user_role === 'user'){
            const requiredDocuments = ['id', 'address', 'account'];
            const userDocuments = user.documents || [];
    
            const hasAllDocuments = requiredDocuments.every(requiredDocument => {
                return userDocuments.some(userDocument => userDocument.name.includes(requiredDocument))
            });
    
            if (!hasAllDocuments) throw new Error('User must have all documents');
        }
    
        return await this.usersManager.toggleUserRole(user);
    } catch (e) {
        throw new Error(e);
    }
}

/*export const changeUserRole = (req, res) =>{
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