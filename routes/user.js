const express = require('express');
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { route } = require('.');
const { verifyToken } = require('./middlewares');

const router = express.Router();

router.post('/', async (req, res, next) => {
    passport.authenticate('local', {session: false}, (authError, token, info) => {
        console.log('login');
        if(authError){
            console.log(authError);
            return next(authError);
        }
        if(!token){
            return res.redirect(`/?error=${info.message}`);
        }
        return req.login(token, {session: false}, (loginError) => {
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            res.cookie('jwt', token, {httpOnly: true});
            //res.render('personal', {user: req.body.id})
            res.redirect('/login/mypage');
        })
    })(req, res, next);
});

router.post('/logout', verifyToken, (req, res, next) => {
    console.log(req.url);
    req.logOut();
    res.clearCookie('jwt');
    res.redirect('/');
})

router.get('/mypage', verifyToken, (req, res, next) => {
    res.render('personal', {user: req.data});
});


module.exports = router;