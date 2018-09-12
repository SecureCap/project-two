var Flickr = require('flickrapi'),
  flickrOptions = {
    api_key: '0bcc8225757ff024f45d0b16c6718031',
    secret: 'e709b11b283d4dcc'
  };

Flickr.authenticate(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object
});

/**
 *  public REST API methods:
 * https://www.flickr.com/services/api/
 * https://www.flickr.com/services/api/flickr.photos.getInfo.html
 */

// create a new Flickr API client. since we're requesting a
// resource that doesn't require user authentication, we can
// just use our API key.

var flickr = new Flickr(process.env.FLICKR_API_KEY);

// call the flickr.photos.getInfo API method and request photo data!

flickr.photos.getInfo({
  photo_id: 25825763
}).then(function (res) {
  console.log('yay!', res.body);
}).catch(function (err) {
  console.error('bonk', err);
});

//exports.FlickrAPI = flickrAPI;