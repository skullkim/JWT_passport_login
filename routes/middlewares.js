const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    try{
        const token = req.headers.cookie.slice(4);
        req.decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.data = req.decoded.id;
        //console.log(req.decoded.id);
        return next();
    }
    catch(err){
        //유효기간 초과
        if(err.name === 'TokenExpiredError'){
            res.redirect('/?error=Token expiration');
        }
        //res.send('hello');
        res.redirect('/?error=Invalied token');
    }
};

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.status(403).send('you need to login');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    }
    else{
        const message = encodeURI('already logged in');
        res.redirec(`/?error=${message}`);
    }
};