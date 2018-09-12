//dependencies
const express = require('express');
const path = require('path');
const fs = require("fs");

const router = express.Router();

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
router.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

//serve static assets
router.use(express.static(path.resolve(__dirname, "..", 'build')));

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

//Always return the main index.hbs, so render the route in the client
router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.hbs'));
})



module.exports = router;