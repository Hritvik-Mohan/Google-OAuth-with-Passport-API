const express = require("express");
const session = require("express-session");
const passport = require('passport');
require('./auth');

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401) // Unauthorized;
}

const app = express();
app.use(session({
    secret: "yeah",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res) => {
    res.send('<a href="auth/google">Authenticate with Google</a>')
})

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    })
);

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    })
);

app.get('auth/failure', (req, res) => {
    res.send('something went wrong..');
});


app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`);
    console.log(req.user.displayName);
});

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye');
});

app.listen(3000, () => console.log("server is started at port 3000"));
