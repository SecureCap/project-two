const router = require('express').Router();
const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = (flickr, app) => {
    router.get("/", (req, res) => {
        flickr.photos.search({
            text: "norway"
        }, function(err, data) {
            console.log(JSON.stringify(data, null, 1));
            if (err) {
                return res.json(err);
            }
            res.render("main", { pictures: data.photos.photo });
        });
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
    });

    app.use(router);
};
