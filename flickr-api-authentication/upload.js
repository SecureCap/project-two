var Request = require('../lib/request').Request;
var validate = require('validate');

var xml = require('../plugins/xml');



// uploads require auth with "write" perms. for this example, we'll use
// oauth as the authentication method. first, sign up for an application
// to get a consumer key and secret and use the oauth flow to obtain an
// oauth token and secret.
// https://www.flickr.com/services/apps/create/apply/?

var auth = Flickr.OAuth.createPlugin(
  process.env.FLICKR_CONSUMER_KEY,
  process.env.FLICKR_CONSUMER_SECRET,
  process.env.FLICKR_OAUTH_TOKEN,
  process.env.FLICKR_OAUTH_TOKEN_SECRET
);

// create a new upload instance. the photo param can be anything
// that superagent accepts.

var upload = new Flickr.Upload(auth, __dirname + '/upload.png', {
  title: 'Works on MY machine!'
});

// this is a request instance, so we can just call .then()
// to kick off the request.

upload.then(function (res) {
  console.log('res', res.body);
}).catch(function (err) {
  console.log('err', err);
});

/*
Creates a new upload service instance. Since the Upload Api only does one thing (upload files), an Upload instance is simply
a request subclass.
The upload endpoint requires authentication. You should pass a confirgured instance of the [OAuth plugin]{@link Flickr.OAuth.createPlugin}
to upload photos on behalf of another user
*/

function Upload(auth, file, args) {

  // allow creating a client without `new`
  if (!(this instanceof Upload)) {
    return new Upload(auth, file, args);
  }

  Request.call(this, 'POST', 'https://up.flickr.com/services/upload');

  if (typeof auth !== 'function') {
    throw new Error('Missing required argument "auth"');
  }

  if (typeof args === 'undefined') {
    args = {};
  }

  this.attach('photo', file);
  this.field(args);
  this.use(xml);
  this.use(auth);
}

Upload.prototype = Object.create(Request.prototype);

module.exports = Upload;