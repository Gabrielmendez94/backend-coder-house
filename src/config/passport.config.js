import passport from 'passport';
import userModel from '../dao/models/users.model.js';
import GitHubStrategy from 'passport-github2';
import local from 'passport-local';
import jwt from 'passport-jwt';
import {default as token} from 'jsonwebtoken';
//import { create } from 'connect-mongo';
import { createHash, isValidPassword } from '../utils.js';

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const PRIVATE_KEY = "CoderkeyFeliz";

export const generateToken = user => token.sign({user}, PRIVATE_KEY, {expiresIn: '1d'});

const cookieExtractor = (req) =>{
    let token = null;
    if(req && req.cookies){
        return token = req?.cookies['coderCookieToken'];
    }
    return token;
}


const LocalStrategy = local.Strategy;
const initializePassport = () => {
    passport.use('current', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done)=>{
        try{
            return done(null, jwt_payload);
        }catch(error){
            done(error);
        }
    })
        /*'github', new GitHubStrategy({
        clientID: 'Iv1.51df95c23da57435',
        clientSecret: '14440d940b2faa8afa47548b062afc3154a182f3',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log({profile});
            let user = await userModel.findOne({ email: profile._json.email });
            if (user) return done(null, user);
            const newUser = {
                first_name: profile._json.name,
                last_name: '',
                email: profile._json.email,
                age: 0,
                password: '',
            }
            user = await userService.create(newUser);
            return done(null, user);
        } catch (error) {
            return done({ message: "Error creating user" });
        }
    })*/);

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username });
            if (!user) return done(null, false, { message: "User not found" });
            if (!isValidPassword(user, password)) return done(null, false);
            delete user.password;
            //return done(null, user);
            const jwt = generateToken(user);
            console.log({jwt})
            return done(null, jwt);
        } catch (error) {
            return done({ message: "Error logging in" });
        }
    }));

    passport.use('register', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, async (req, username, password, done)=>{
        const {first_name, last_name, email, birth_date, role} = req.body;
        try{
            let user = await userModel.findOne({email: username});
            if(user) return done(null,false, {message: 'User already exists'});
            const newUser = {
                first_name,
                last_name,
                email,
                birth_date,
                password: createHash(password),
                role
            }
            user = await userModel.create(newUser);
            return done(null, user);
        } catch(error){
            return done({message: 'Error creating user'});
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