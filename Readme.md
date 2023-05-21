app.get('/auth', passport.authenticate('google', {
    scope:
        ['email', 'profile']
}));

As soon as the /auth is hit google authenticate window is opened. If the browser is automatically signed in with google it will take that by defualt

After authentication is done it does hit this method.Here user will have all the user details.You can do everything like storing to the DB or something else:

function (request, accessToken, refreshToken, user, done) {
            console.log("1", user);
            return done(null, user);
}

Then it gets redirected to the url mentioned. In this case it is:"/auth/callback"

app.get('/auth/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

    Then it gets redirect to  the following depending on failure of success stauts

To logout we use 

app.get('/auth/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

To check our authentication stautus we can use req.isAuthenticated()