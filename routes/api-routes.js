/*

Your unique user ID:
Api key: 0bcc8225757ff024f45d0b16c6718031
Api secret: e709b11b283d4dcc

*/
var express = require('express');

var router = express.Router();

var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "0bcc8225757ff024f45d0b16c6718031",
      secret: "e709b11b283d4dcc",
      requestOptions: {
        timeout: 20000,
        /* other default options accepted by request.defaults */
      }
    };

Flickr.tokenOnly(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object,
  // but we can only call public methods and access public data
});

router.get("/api/gallery",(req, res) => {
    res.send("muahahahaha TO BE DEVELOPED!!")
});


module.exports = router;