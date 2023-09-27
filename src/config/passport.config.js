import passport from 'passport';
import userModel from '../dao/models/users.model.js';
import GitHubStrategy, { Strategy } from 'passport-github2';
import local from 'passport-local';
import jwt from 'passport-jwt';
import {default as token} from 'jsonwebtoken';
import config from './config.js';
import { createHash, isValidPassword, cookieExtractor } from '../utils.js';
import UserDTO from '../dto/users.dto.js';

//Env var
const COOKIE_PASS = 'coderCookieToken'/*config.jwtAuth.privateKey*/, CLIENT_ID = config.githubAuth.clientId, CLIENT_SECRET = config.githubAuth.clientSecret, ADMIN_USER= config.admin.user, ADMIN_PASSWORD=config.admin.password;


//JWT
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
export const generateToken = user => token.sign({user}, COOKIE_PASS, {expiresIn: '1d'});

//Local
const LocalStrategy = local.Strategy;



const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, async (req, username, password, done)=>{
        let errorMsg;
        try{
            const {first_name, last_name, email, birth_date, role} = req.body;
            if(username.toLowerCase() === ADMIN_USER.toLowerCase()){
                errorMsg = "User already exists";
                return done(null, false, errorMsg );                
            }
            const exists = await userModel.findOne({ email: { $regex: new RegExp(`^${username}$`, 'i') } });
            if(exists){
                errorMsg = "User already exists";
                return done(null, false, errorMsg );
            }
            const newUser = {
                first_name,
                last_name,
                email: email.toLowerCase(),
                birth_date,
                password: createHash(password),
                role,
            };
            const user = await userModel.create(newUser);
            const userDTO = new UserDTO(user);
            return done(null, userDTO);
        } catch (error) {
            errorMsg = error.message;
            return done( errorMsg );
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true,
     }, async (req, username, password, done) => {
        let errorMsg;
        try {
            let userJwt;
            if(username.toLowerCase() === ADMIN_USER.toLowerCase()){
                if(password !== ADMIN_PASSWORD){
                    errorMsg = 'Password is incorrect';
                    return done(null, false, errorMsg);
                }
                userJwt = {
                    first_name: 'Admin',
                    last_name: 'Admin',
                    email: ADMIN_USER,
                    birth_date: '',
                    role: 'admin'
                };
            }else{
                const user = await userModel.findOne({ email: { $regex: new RegExp(`^${username}$`, 'i') } });
                if(!user){
                    errorMsg = "Wrong User";
                    return done(null, false, errorMsg );                    
                }
                if (!isValidPassword(user, password)) {
                    errorMsg = "Password is incorrect";
                    return done(null, false, errorMsg );
                }
                const userDTO = new UserDTO(user);
                userJwt = userDTO;
            }
            const jwt = generateToken(userJwt);
            return done(null, jwt); 
        }catch (error) {
            errorMsg = error.message;
            return done( errorMsg );
        }
    }));

    passport.use('restartpassword', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'newPassword',
        passReqToCallback: true,
    }, async (req, username, password, done)=>{
        let errorMsg;
        try{
            if(username.toLowerCase()=== ADMIN_USER.toLowerCase()){
                errorMsg = "Admin password cannot be reset";
                return done (null, false, errorMsg);
            } else{
                const user = await userModel.findOne({email: {$regex: new RegExp(`^${username}$`, 'i')}});
                if(!user){
                    errorMsg = "Wrong user";
                    return done(null, false, errorMsg );                    
                }
                const newHashedPassword = createHash(password);
                await userModel.updateOne({ _id: user._id }, { $set: { password: newHashedPassword } });
                const userDTO = new UserDTO(user);                
                return done(null, userDTO);
            }
        } catch(error){
            errorMsg = error.message;
            return done (errorMsg);
        }
    }));

    passport.use('current', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: COOKIE_PASS
    }, async (jwt_payload, done)=>{
        try{
            const filter = new UserDTO(jwt_payload);
            return done(null, filter);
        }catch(error){
            done(error);
        }
    }));

    passport.use('github', new GitHubStrategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userModel.findOne({ email: profile._json.email });
            if(!user){
                user = {
                    first_name: profile._json.name,
                    last_name: '',
                    email: profile._json.email,
                    password: '',
                }
                user = await userModel.create(user);
            }
            const userDTO = new UserDTO(user);
            const jwt = generateToken(userDTO);
            return done(null, jwt);
        } catch(error){
            return done ('Github login failure');
        }
    }));

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: COOKIE_PASS
    }, async (jwt_payload, done) => {
        try {
            const user = jwt_payload.user;
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (_id, done) => {
        try {
            const user = await userService.findOne({ _id });
            return done(null, user);
        } catch {
            return done({ message: "Error deserializing user" });
        }
    });
};

export default initializePassport;