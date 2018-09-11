/*

Your unique user ID:
Api key: 0bcc8225757ff024f45d0b16c6718031
Api secret: e709b11b283d4dcc

API URL: http://127.0.0.1:3000/service/rest/flickr.method.name

{ "frob": { "_content": "72157700911378704-da0d98cc9b279253-166776085" }, "stat": "ok" }

{ "auth":{
    "token": { "_content": "72157699598233281-f7f6dd29b639495f" },
    "perms": { "_content": "delete" },
    "user": { "nsid": "166821407@N06", "username": "Twilliams397", "fullname": "Terry Williams" } }, "stat": "ok" }

    { "auth": {
    "access_token": { "oauth_token": "72157700911505614-7613f3f7784ec5d2", "oauth_token_secret": "7ee90de4783c35ed" } }, "stat": "ok" }

*/


// var Request= require('./request').Request,
//   Auth= require('./auth').Auth,
//   Photos= require('./photos').Photos,
//   Feeds= require('./feeds').Feeds,
//   Urls= require('./urls').Urls;

// var Flickr = require('flickrapi'),
//   flickrOptions = {
//     api_key: '0bcc8225757ff024f45d0b16c6718031',
//     shared_secret: 'e709b11b283d4dcc',
//     requestOptions: {
//       timeout: 20000,
//       /* other default options accepted by request.defaults */
//     }
//   };

// Flickr.tokenOnly(flickrOptions, function(err, flickr) {
// // we can now use "flickr" as our API object,
// // but we can only call public methods and access public data
// });

// var FlickrAPI= function FlickAPI(api_key, shared_secret, auth_token) {
//   this.configure(api_key, shared_secret, auth_token);
// };

// FlickrAPI.prototype.configure= function(api_key, shared_secret, auth_token) {
//   this.api_key= api_key;

//   this.request= new Request(api_key, shared_secret, auth_token);

//   this.photos= new Photos(this.request);
//   this.auth= new Auth(this.request);
//   this.urls= new Urls(this.request);

//   this.feedRequest= new Request(api_key, shared, auth_token, true);
//   this.feeds= new Feeds(this.feedRequest);
// };

// FlickrAPI.prototype.setAuthenticationToken= function(auth_token) {
//   this.request.setAuthenticationToken(auth_token);
//   this.feedRequest.setAuthenticationToken(auth_token);
// };

// FlickrAPI.prototype.getLoginUrl= function(permissions, frob, callback) {
//   if(frob) {
//     var sig= this.request.generateSignature(this.shared_secret, {
//       'api_key': this.api_key,
//       'perms': permissions,
//       'frob': frob
//     });
//     callback(null, 'http://flickr.com/services/auth/?api_key='+this.api_key+'&perms='+permissions+'&frob='+'&api_sig='+ sig, frob);
//   } else {
//     var self= this;
//     this.auth.getFrob(function(err, frob) {
//       if(err) {
//         callback(err);
//       } else {
//         var sig= self.request.generateSignature(self.shared_secret, {
//           'api_key': self.api_key,
//           'perms': permissions,
//           'frob': frob
//         });
//         callback(null, 'http://flickr.com/services/auth/?api_key='+self.api_key+'&perms='+permissions+'&frob='+frob+'&api_sig='+ sig, frob);
//       }
//     });
//   }
// };

// exports.FlickrAPI = FlickrAPI;


































// /*

// Your unique user ID:
// Api key: 0bcc8225757ff024f45d0b16c6718031
// Api secret: e709b11b283d4dcc

// */
// var express = require('express');

// var router = express.Router();

// var Flickr = require("flickrapi"),
//     flickrOptions = {
//       api_key: "0bcc8225757ff024f45d0b16c6718031",
//       secret: "e709b11b283d4dcc",
//       requestOptions: {
//         timeout: 20000,
//         /* other default options accepted by request.defaults */
//       }
//     };

// Flickr.tokenOnly(flickrOptions, function(error, flickr) {
//   // we can now use "flickr" as our API object,
//   // but we can only call public methods and access public data
// });

// //call functions that dont require authentication
// flickr.people.getPhotos({
//     api_key: "0bcc8225757ff024f45d0b16c6718031",
//     user_id:"",
//     authenticated: true,
//     page: 1,
//     per_page: 100
//   }, function(err, result) {
//     /*
//       This will now give all public and private results,
//       because we explicitly ran this as an authenticated call
//     */
//   });

// router.get("/api/gallery",(req, res) => {
//     res.send("muahahahaha TO BE DEVELOPED!!")
// });


// module.exports = router;