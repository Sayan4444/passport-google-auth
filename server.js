const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const initializePassport = require('./passport');

dotenv.config({ path: './config.env' });

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    res.send("<button><a href='/auth'>Login With Google</a></button>")
});

// Auth
app.get('/auth', passport.authenticate('google', {
    scope:
        ['email', 'profile']
}));

// Auth Callback
app.get('/auth/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/callback/success',
        failureRedirect: '/auth/callback/failure'
    }), (req, res) => {
        console.log('2');
    });

// Success
app.get('/auth/callback/success', (req, res) => {
    console.log('3');
    if (!req.user)
        res.redirect('/auth/callback/failure');
    res.send("Welcome " + req.user);
});

// failure
app.get('/auth/callback/failure', (req, res) => {
    res.send("Error");
})

app.listen(4000, () => {
    console.log("Server Running on port 4000");
});
