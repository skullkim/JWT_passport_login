const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const {sequelize} = require('./models');
const nunjucks = require('nunjucks');
const favicon = require('serve-favicon');
const passport = require('passport');
const cookie_parser = require('cookie-parser');

dotenv.config();

const app = express();
app.set('port', process.env.PORT || 8080);


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(favicon(path.join(__dirname, '/public/apple-logo.ico')));
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

sequelize.sync({force: false})
    .then(() => console.log('success to connect DB'))
    .catch((err) => console.error(err));

const index_router = require('./routes');
const login_router = require('./routes/user');
const signup_router = require('./routes/signup');
const passportConfig = require('./passport');
const personal_router = require('./routes/personal');

app.use(cookie_parser());
passportConfig();
app.use(passport.initialize());
app.use(passport.session());
app.use('/script', express.static('public'));
app.use('/', index_router);
app.use('/login/', login_router);
app.use('/signup/', signup_router);


app.use((req, res, next) => {
    const error = new Error(`main ${req.method} ${req.url} doesn't exist`);
    console.error(error);
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.err = process.env.NODE_DEV !== 'production' ? err : {};
    res.status(err.status || 500).json({
        message: err.message,
        error: err,
    });
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')} connect success`);
})