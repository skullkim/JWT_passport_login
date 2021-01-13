const express = require('express');
const path = require('path');
const sanitize = require('sanitize-html');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
express.urlencoded({extended: true});

const router = express.Router();

router.get('/', (req, res, next) => {
    try{
        res.sendFile(path.join(__dirname, '../views/signup.html'));
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/check-signup', async(req, res, next) => {
    try{
        const {id, passwd1, passwd2} = req.body;
        const ex_user = await User.findOne({
            where: {name: id},
        });
        if(ex_user){
            return res.redirect('/signup/?error=same is exist');
        }
        else if(passwd1 !== passwd2){
            return res.redirect('/signup/?error=wrong password');
        }
        sanitize(passwd1);
        const hash = await bcrypt.hash(passwd1, 12);
        sanitize(id);
        await User.create({
            name: id,
            password: hash,
        });
        return res.redirect('/?success=signup success');
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/main-page', (req, res, next) => {
    try{
        res.redirect('/');
    }
    catch(err){
        console.error(err);
        next(err);
    }
})

module.exports = router;