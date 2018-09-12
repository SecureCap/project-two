const router = require('express').Router();
const passport = require('../config/passport');
const db = require('../models');
//dependencies
const express = require('express');
const path = require('path');
const fs = require("fs");

const isAuthenticated = require('../config/middleware/isAuthenticated');

// Signup and login routes
router.post('/api/login', passport.authenticate('local'), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    console.log('redirected to /api/login', req.user.dataValues);
    // return res.render("profile", {user: req.user.dataValues});
    return res.json("/profile");
});

router.post('/api/signup', function(req, res) {
    console.log(req.body);

    db.User.create({
        username: req.body.username,
        password: req.body.password
    }).then(function(data) {
        console.log("data from user.create:", JSON.stringify(data, null, 2));
        console.log("redirecting to /api/login")
        res.redirect(307, "/api/login");
        
            // return res.render("signup", {
            //     error: "Username has already been taken"
            // })
        
    }).catch(function(err) {
        console.log("Error in user creation", JSON.stringify(err, null, 2));
        return res.render("signup", {error})
    })
});

router.get("/api/logout", function(req, res) {
    req.logout();
    res.send("You have been successfully logged out");
});

// Route for getting some data out of the user
router.get("/api/user_data", isAuthenticated, function(req, res) {
    if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
    } else {
        // Otherwise send back the user's email and id
        res.json({
            username: req.user.username,
            id: req.user.id
        });
    }
});

router.get("/api/users", function(req, res) {
    db.User.findAll()
        .then(function(data) {
            res.json(data);
        });
});

function getApiKeys(callback, errorcallback) {
    fs.readFile(path.resolve(__dirname, "./api_key.txt"), "utf-8", (err, api_key) => {
        if (err) {
            errrorcallback(err);
            return;
        }
        fs.readFile(path.resolve(__dirname, "./api_secret.txt"), "utf-8",(err, api_secret) => {
            if(err) {
                errorcallback(err);
                return;
            }
            callback(api_key, api_secret);
        });
    });
}
//setup logger
// router.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

//serve static assets
// router.use(express.static(path.resolve(__dirname, "..", 'build')));

//searches flickr for a specific query
router.get('/flickr/:query', function (req, res) {
    console.log("Flickr call query=" + req.params['query'] );
    getApiKeys((api_key, api_secret) => {
        const Flickr = require("flickrapi"),
        flickrOptions = {
            api_key: api_key,
            secret: api_secret
        };
        console.log(api_key);
        console.log(api_secret);
    Flickr.tokenOnly(flickrOptions, function(error, flickr) {
        console.log("tokenOnly");
        if (error) {
            res.send(error);
            return;
        }
        //we can now use flickr as our api object,
        // but we can only call public methods and access public data
        flickr.photos.search({
            safe:1,
            sort: "relevance",
            text:req.params["query"]
        }, (err, data) => {
            if (err) res.send(err);
            console.log("Got flickr data sending it");
            res.send(data);
        });
    });
    }, (err) => {
        console.log(err);
        res.send("Error");
    })
});




module.exports = router;