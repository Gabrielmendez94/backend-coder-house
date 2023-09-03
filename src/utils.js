import {fileURLToPath} from 'url';
import {dirname} from 'path';
import bcrypt from 'bcrypt';
import config from './config/config.js';
import passport from 'passport';
import  jwt  from 'jsonwebtoken';

const COOKIE_PASS ='coderCookieToken' /*config.cookie.cookiePass*/, PRIVATE_KEY = config.jwtAuth.privateKey;

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            if (err) return res.status(500).send({ status: 0, msg: err.message ? err.message : err.toString() });
            if (!user) return res.status(401).send({ status: 0, msg: info.message ? info.message : info.toString() });
            req.user = user;
            next();
        })(req, res, next);
    };
};

export const cookieExtractor = (req) =>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies['coderCookieToken'];
    }
    return token;
}

export const autorizacion = (role) => {

    return async(req, res, next)=>{
        const authHeader = req.headers.coderCookieToken;
        if(!authHeader) return res.status(401).send({ status: 0, msg: 'Unauthorized' });
        const token = authHeader.split(' ')[1];
        jwt.verify(token, COOKIE_PASS, (error, credentials)=>{
            if(error) return res.status(401).send({ status: 0, msg: 'Unauthorized' });
            req.user = credentials;
            if(role !== req.user.role) return res.send({status: 0, message: 'Forbidden'});
            next();
        })
    }
};

    export const jwtVerify = (token) =>{
        try{
            const decodedToken = jwt.verify(token, PRIVATE_KEY);
            return decodedToken;
        } catch (error){
            return false;
        }
    }