import config from "../config/config.js";

const COOKIE_PASS = config.cookie.cookiePass; 

const register = (req, res)=>{
    res.send({ status: 1, msg: "New user registered" , user: req.user});
}

const login = (req, res)=>{
    res.cookie(COOKIE_PASS, req.user, {httpOnly: true}).send({ status: 1, msg: 'Flowerier successfully logged in', jwt: req.user });
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

export default {
    register,
    login,
    restartpassword,
    logout,
    github,
    githubCallback,
    currentUser
};