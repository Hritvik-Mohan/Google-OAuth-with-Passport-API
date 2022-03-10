require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport')


passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/google/callback",
        passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {

        return done(null, profile);
        // User.findOrCreate({
        //     googleId: profile.id
        // }, function (err, user) {
        //     return done(err, user);
        // });
    }
));


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});