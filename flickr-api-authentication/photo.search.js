var Flickr = require('flickrapi'),
  flickrOptions = {
    api_key: '0bcc8225757ff024f45d0b16c6718031',
    secret: 'e709b11b283d4dcc'
  };

Flickr.authenticate(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object
});


// create a new Flickr API client. since we're requesting a
// resource that doesn't require user authentication, we can
// just use our API key.

var flickr = new Flickr(process.env.FLICKR_API_KEY);

// call the flickr.photos.search API method and search the photos!

flickr.photos.search({
  text: 'doggo'
}).then(function (res) {
  console.log('yay!', res.body.photos.photo);
}).catch(function (err) {
  console.error('bonk', err);
});