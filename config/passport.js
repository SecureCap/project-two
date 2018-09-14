const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "password"
}, (username, password, done) => {
    console.log("inside local strategy",JSON.stringify({username, password}, null, 2));
    db.User.findOne({
        where: {
            username: username
        }
    }).then(dbUser => {
        console.log("Found user in database", JSON.stringify(dbUser, null, 2));
        // If there is no user with the given username
        if (!dbUser) {
            return done(null, false, {
                message: "Incorrect username"
            });
        }
        // If there is a user with the given email, but the password doesn't match
        else if (!dbUser.validPassword(password)) {
            return done(null, false, {
                message: "Incorrect password"
            });
        }
        // If none of the above, successful login.
        // Return the user
        return done(null, dbUser);
    });
}
));

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

module.exports = passport;
