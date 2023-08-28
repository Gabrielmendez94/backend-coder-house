import {fileURLToPath} from 'url';
import {dirname} from 'path';
import bcrypt from 'bcrypt';
import config from './config/config.js';
import passport from 'passport';
import  jwt  from 'jsonwebtoken';

const COOKIE_PASS = config.cookie.cookiePass;

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
        token = req?.cookies[COOKIE_PASS];
    }
    return token;
}

export const autorizacion = (role) => {
    return async (req, res, next) => {
        const token = await cookieExtractor(req);
        if (!token) {
            return res.status(401).send({ status: 0, msg: 'Unauthorized' });
        }
        try {
            const decodedToken = jwt.verify(token, PRIVATE_KEY);
            req.user = decodedToken.user;
            if (role) {
                const userRoles = Array.isArray(req.user.role) ? req.user.role : [req.user.role];
                if (Array.isArray(role)) {
                    if (!role.some(r => userRoles.includes(r))) {
                        return res.status(403).send({ status: 0, msg: 'Forbidden' });
                    }
                } else {
                    if (!userRoles.includes(role)) {
                        return res.status(403).send({ status: 0, msg: 'Forbidden' });
                    }
                }
            }
            next();
        } catch (error) {
            return res.status(401).send({ status: 0, msg: 'Unauthorized' });
        }
    };
};