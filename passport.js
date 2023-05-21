const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const initializePassport = () => {
    passport.serializeUser((user, done) => {
        done(null, user);
    })
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: "http://localhost:4000/auth/callback",
        passReqToCallback: true
    },
        function (request, accessToken, refreshToken, user, done) {
            console.log('1');
            return done(null, user);
        }
    ));
}

module.exports = initializePassport;
