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

/* 
$.ajax({
url: 'https://api.flickr.com/services/rest/',
dataType: 'jsonp',
data: {
"method":"flickr.photos.search",
"user_id":"34210875@N06",
"format":"json",
"tags":"featured",
"tag_mode": "any",
}
});


function FlickrPhoto(title, owner, flickrURL, imageURL) {
    this.title = title;
    this.owner = owner;
    this.flickrURL = flickrURL;
    this.imageURL = imageURL;
}

function FlickrService() {
    this.flickrApiKey = "763559574f01aba248683d2c09e3f701";
    this.flickrGetInfoURL = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&nojsoncallback=1&format=json";

    this.getPhotoInfo = function(photoId, callback) {
        var ajaxOptions = {
            type: 'GET',
            url: this.flickrGetInfoURL,
            data: { api_key: this.flickrApiKey, photo_id: photoId },
            dataType: 'json',
            success: function (data) { 
                if (data.stat == "ok") {
                    var photo = data.photo;
                    var photoTitle = photo.title._content;
                    var photoOwner = photo.owner.realname;
                    var photoWebURL = photo.urls.url[0]._content;
                    var photoStaticURL = "https://farm" + photo.farm + ".staticflickr.com/" +  photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";

                    var flickrPhoto = new FlickrPhoto(photoTitle, photoOwner, photoWebURL, photoStaticURL);
                    callback(flickrPhoto);
                }
            }
        };

        $.ajax(ajaxOptions);
    }
}

var photoId = "11837138576";
var flickrService = new FlickrService();
flickrService.getPhotoInfo(photoId, function(photo) {
    console.log(photo.imageURL);
    console.log(photo.owner);
});



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



$(document).ready(function () {
    function FlickrPhoto(title, owner, flickrURL, imageURL) {
        this.title = title;
        this.owner = owner;
        this.flickrURL = flickrURL;
        this.imageURL = imageURL;
    };


function FlickrService() {
this.flickrApiKey = "0bcc8225757ff024f45d0b16c6718031";
this.flickrGetInfoURL = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&nojsoncallback=1&format=json";

this.getPhotoInfo = function(photoId, callback) {
    var ajaxOptions = {
        type: 'GET',
        url: this.flickrGetInfoURL,
        data: { api_key: this.flickrApiKey, photo_id: photoId },
        dataType: 'json',
        success: function (data) { 
            if (data.stat == "ok") {
                var photo = data.photo;
                var photoTitle = photo.title._content;
                var photoOwner = photo.owner.realname;
                var photoWebURL = photo.urls.url[0]._content;
                var photoStaticURL = "https://farm" + photo.farm + ".staticflickr.com/" +  photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";

                var flickrPhoto = new FlickrPhoto(photoTitle, photoOwner, photoWebURL, photoStaticURL);
                callback(flickrPhoto);
            }
        }
    };

    $.ajax(ajaxOptions);
 }.thenn(response => {
     for (i = 0; i < response.PhotoList.length; i++) {
          var imgCont = '<div class="image-container" style="background: url(' + photoURL + ');"><div class="image-info"><p class="top"><a class="title" href="http://www.flickr.com/photos/' + data.photo.owner.nsid + '/' + photoID + '">' + data.photo.title._content + '</a> <span class="author">by <a href="http://flickr.com/photos/' + data.photo.owner.nsid + '">' + data.photo.owner.username + '</a></span></p><div class="bottom"><p><span class="infoTitle">Comments:</span> ' + data.photo.comments._content + '</p>';
                        
                        //if there are tags associated with the image
                        if (typeof(tags) != 'undefined') {
                        
                            //combine the tags with an html snippet and add them to the end of the 'imgCont' variable
                            imgCont += '<p><span class="infoTitle">Tags:</span> ' + tags + '</p>';
                        }
                        
                        //if the image has geo location information associate with it
                        if(typeof(pLocation) != 'undefined'){
                        
                            //combine the geo location data into an html snippet and at that to the end fo the 'imgCont' variable
                            imgCont += '<p><span class="infoTitle">Location:</span> ' + pLocation + '</p>';
                        }
                        
                        //add the description & html snippet to the end of the 'imgCont' variable
                        imgCont += '<p><span class="infoTitle">Decription:</span> ' + data.photo.description._content + '</p></div></div>';
                        
                        //append the 'imgCont' variable to the document
                        $(imgCont).appendTo('#test1');
                        
                        //delete the pLocation global variable so that it does not repeat
                        delete pLocation;
                    });
                    
                });
            });
     }
 })
}
});
});





































