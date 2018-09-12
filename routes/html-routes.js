const router = require('express').Router();
const passport = require('../config/passport');
const isAuthenticated = require('../config/middleware/isAuthenticated');

router.get("/", (req, res) => {
    res.render("main", { user: req.user })
});

router.get("/login", ((req, res) => {
    // If the user already has an account send them to the private resource
    if (req.user) {
        res.redirect('/gallery');
    }
    res.render("partials/login", { user: req.user });
}));

router.get("/signup", ((req, res) => {
    res.render("signup", {user: req.user});
}));

router.get("/profile", isAuthenticated, (req, res) => {
    res.render("profile", {user: req.user});
});

router.get('/invalid', (req, res) => {
    res.render("invalid");
})

module.exports = router;