import passport from 'passport';
import userService from '../dao/models/users.model.js';
import GitHubStrategy from 'passport-github2';
import local from 'passport-local';

const LocalStrategy = local.Strategy;
const initializePassport = () => {
    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.51df95c23da57435',
        clientSecret: '14440d940b2faa8afa47548b062afc3154a182f3',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log({profile});
            let user = await userService.findOne({ email: profile._json.email });
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
    }));

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await userService.findOne({ email: username });
            if (!user) return done(null, false, { message: "User not found" });
            if (!isValidPassword(user, password)) return done(null, false);
            return done(null, user);
        } catch (error) {
            return done({ message: "Error logging in" });
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