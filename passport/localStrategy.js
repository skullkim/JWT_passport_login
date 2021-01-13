const passport = require('passport');
const local_strategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../models/user');

module.exports = () => {
    passport.use(new local_strategy({
        usernameField: 'id',
        passwordField: 'passwd',
    }, async(id, passwd, done) => {
        console.log('local');
        try{
            const ex_user = await User.findOne({
                where: {name: id}
            });
            if(!ex_user){
                done(null, false, {message: 'Dit not signup yet'});
            }
            else{
                const result = await bcrypt.compare(passwd, ex_user.password);
                if(!result){
                    done(null, false, {message: 'wrong password'});
                }
                const token = jwt.sign({
                    id,
                    passwd,
                }, process.env.JWT_SECRET, {
                    expiresIn: '1m',
                    issuer: 'iskull',
                });
                done(null, token);
            }
        }
        catch(err){
            console.error(err);
            done(err);
        }
    }));
};