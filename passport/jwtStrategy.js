const User = require('../models/user');
const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJst = require('passport-jwt').ExtractJwt;
const opts = {
    //Function that accepts a request as the only parameter and
    //returns either the JWT as a string or null.
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //A String or buffer containing the secrete or PEM-encoded 
    //public key(asymmetric) from verifying the token's signature.
    secretOrkey: process.env.JWT_SECRET,
};


passport.use(new jwtStrategy(opts, async (payload, done) => {
    console.log(payload);
    done(null, payload);
    //User.findOne()
}));

