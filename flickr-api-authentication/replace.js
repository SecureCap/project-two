// var Request = require('../lib/request').Request
// var xml = require('../plugins/xml');



// // replace requires auth with "write" perms. for this example, we'll use
// // oauth as the authentication method. first, sign up for an application
// // to get a consumer key and secret and use the oauth flow to obtain an
// // oauth token and secret.
// // https://www.flickr.com/services/apps/create/apply/?

// var auth = Flickr.OAuth.createPlugin(
// 	process.env.FLICKR_CONSUMER_KEY,
// 	process.env.FLICKR_CONSUMER_SECRET,
// 	process.env.FLICKR_OAUTH_TOKEN,
// 	process.env.FLICKR_OAUTH_TOKEN_SECRET
// );

// // pass in the photo ID to replace over ARGV
// // $ node examples/replace.js 41234567890

// var photoID = process.argv[2];

// // create a new replace instance. the photo ID to replace must exist
// // and be owned by the calling user. the photo param can be anything
// // that superagent accepts.

// var replace = new Flickr.Replace(auth, photoID, __dirname + '/replace.png', {
// 	title: 'Now in pink!'
// });

// // this is a request instance, so we can just call .then()
// // to kick off the request.

// replace.then(function (res) {
// 	console.log('res', res.body);
// }).catch(function (err) {
// 	console.log('err', err);

// /* 
// creates a new replace service instance. Since the replace api only does one thing (replace files), an Replace instance is simply a request subclass
// the replace endpoint requires authentication. you should pass a configured instance of the [OAuth plugin]{@link Flickr.OAuth.createPlugin} to replace photos on behalf
// of another user
// */

// function Replace(auth, photoID, file, args) {

// 	// allow creating a client without `new`
// 	if (!(this instanceof Replace)) {
// 		return new Replace(auth, photoID, file, args);
// 	}

// 	Request.call(this, 'POST', 'https://up.flickr.com/services/replace');

// 	if (typeof auth !== 'function') {
// 		throw new Error('Missing required argument "auth"');
// 	}

// 	if (typeof photoID === 'undefined') {
// 		throw new Error('Missing required argument "photoID"');
// 	}

// 	if (typeof args === 'undefined') {
// 		args = {};
// 	}

// 	this.attach('photo', file);
// 	this.field('photo_id', photoID);
// 	this.field(args);
// 	this.use(xml);
// 	this.use(auth);
// }

// Replace.prototype = Object.create(Request.prototype);

// module.exports = Replace;