import UserManager from "../dao/mongo/usersManager.js";
import {default as token} from 'jsonwebtoken';
import config from "../config/config.js";
import nodemailer from 'nodemailer';
import userModel from "../dao/models/users.model.js";

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

const usersManager = new UserManager(), user_Model = new userModel() ;

export const getUsers = async (req, res)=>{
    try{
        const users = await usersManager.getAllUsers();
        res.json(users);
    }catch(error){
        throw new Error(e);
    }
}

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

export const deleteInactiveUsers = async (req, res) => {
    try {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
      const deletedUsers = await user_Model.deleteMany({ last_connection: { $lt: twoDaysAgo } });
  
      if (deletedUsers.deletedCount > 0) {
        deletedUsers.forEach(async (user) => {
          const { email } = user;
  
          try {
  
            transport.sendMail({
              from: `Coder ${config.mailing.auth.user}>`,
              to: email,
              subject: "Cuenta eliminada",
              html: `<h1>Tu cuenta ha sido eliminada</h1>
                     <p>Lamentamos informarte que tu cuenta ha sido eliminada debido a inactividad.</p>`,
            });
  
            console.log(`Correo enviado a ${email}`);
          } catch (error) {
            console.error(`Error al enviar correo a ${email}: ${error.message}`);
          }
        });
  
        return res.status(200).json({ message: `Se eliminaron ${deletedUsers.deletedCount} usuarios inactivos` });
      } else {
        return res.status(200).json({ message: 'No se encontraron usuarios inactivos para eliminar' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar usuarios inactivos' });
    }
  };