import {fileURLToPath} from 'url';
import {dirname} from 'path';
import bcrypt from 'bcrypt';
import config from './config/config.js';
import passport from 'passport';
import  jwt  from 'jsonwebtoken';
import {faker} from '@faker-js/faker';

const COOKIE_PASS ='coderCookieToken' /*config.cookie.cookiePass*///, PRIVATE_KEY = config.jwtAuth.privateKey;

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
        token = req.cookies[COOKIE_PASS];
    }
    return token;
}

export const autorizacion = (role) => {

    return async(req, res, next)=>{
        const authHeader = req.headers.codercookietoken;
        if(!authHeader) return res.status(401).send({ status: 0, msg: 'Unauthorized' });
        jwt.verify(authHeader, COOKIE_PASS, (error, credentials)=>{
            if(error) return res.status(401).send({ status: 0, msg: 'Unauthorized' });
            req.user = credentials;
            if(!role.find((element)=> element === req.user.user.role)) return res.send({status: 0, message: 'Forbidden'});
            next();
        })
    }
};

export const jwtVerify = (token) =>{
    try{
        const decodedToken = jwt.verify(token, COOKIE_PASS);
        return decodedToken;
    } catch (error){
        return false;
    }
}

export const generateMocks = () =>{
    let products = [];
    for (let i = 0; i < 50; i++){
        let newProd = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.string.alphanumeric({length: {min: 5, max: 10}}),
            price: faker.commerce.price({ dec: 0, symbol: '$' }),
            stock: faker.string.numeric(3),
            category: faker.commerce.department(),
            thumbnail: faker.img.url(),
            id: faker.database.mongodbObjectId(),                        
        }
        products.push(newProd);
    }
    return products;
}