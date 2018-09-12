var http = require('http');
var parse = require('url').parse;

var request = require('../lib/request');
var oauth = require('../plugins/oauth');



var oauth = new Flickr.OAuth(
  process.env.FLICKR_CONSUMER_KEY,
  process.env.FLICKR_CONSUMER_SECRET
);

// our application will need some sort of database to store request
// tokens and oauth tokens for the user. you should use an actual
// database instead of in-memory maps.

var db = {
  users: new Map(),
  oauth: new Map()
};

// obtain a request token from the Flickr API. the user will then be
// redirected to flickr to authorize your application. if they do,
// they will be redirected back to your application with a request
// token verifier, which you will exchange for the real oauth token.

function getRequestToken(req, res) {
  oauth.request('http://localhost:3000/oauth/callback').then(function (_res) {
    var requestToken = _res.body.oauth_token;
    var requestTokenSecret = _res.body.oauth_token_secret;

    // store the request token and secret in the database
    db.oauth.set(requestToken, requestTokenSecret);

    // redirect the user to flickr and ask them to authorize your app.
    // perms default to "read", but you may specify "write" or "delete".
    res.statusCode = 302;
    res.setHeader('location', oauth.authorizeUrl(requestToken, 'write'));
    res.end();

  }).catch(function (err) {
    res.statusCode = 400;
    res.end(err.message);
  });
}

// congratulations! the user has authorized your app. now you need to
// verify and exchange the request token for the user's oauth token
// and secret. at this point, we no longer need our request token
// and secret so we can get rid of them, and we can store the user's
// oauth token and secret in our database to make authenticated api calls.

function verifyRequestToken(req, res, query) {
  var requestToken = query.oauth_token;
  var oauthVerifier = query.oauth_verifier;

  // retrieve the request secret from the database
  var requestTokenSecret = db.oauth.get(requestToken);

  oauth.verify(requestToken, oauthVerifier, requestTokenSecret).then(function (_res) {
    var userNsid = _res.body.user_nsid;
    var oauthToken = _res.body.oauth_token;
    var oauthTokenSecret = _res.body.oauth_token_secret;
    var flickr;

    // store the oauth token and secret in the database
    db.users.set(userNsid, {
      oauthToken: oauthToken,
      oauthTokenSecret: oauthTokenSecret
    });

    // we no longer need the request token and secret so we can delete them
    db.oauth.delete(requestToken);

    // log our oauth token and secret for debugging
    console.log('oauth token:', oauthToken);
    console.log('oauth token secret:', oauthTokenSecret);

    // create a new Flickr API client using the oauth plugin
    flickr = new Flickr(oauth.plugin(
      oauthToken,
      oauthTokenSecret
    ));

    // make an API call on behalf of the user
    flickr.test.login().pipe(res);

  }).catch(function (err) {
    res.statusCode = 400;
    res.end(err.message);
  });
}

// create a simple server to handle incoming requests.

http.createServer(function (req, res) {
  var url = parse(req.url, true);

  switch (url.pathname) {
  case '/':
    return getRequestToken(req, res);
  case '/oauth/callback':
    return verifyRequestToken(req, res, url.query);
  default:
    res.statusCode = 404;
    res.end();
  }
}).listen(3000, function () {
  console.log('Open your browser to http://localhost:3000');
});

//Creates a new Oauth service instance. you can use this service to request and validate oauth tokens, as well as generate auth plugin suitable for use with the REST and Upload services.


function OAuth(consumerKey, consumerSecret) {

  // allow creating a client without `new`
  if (!(this instanceof OAuth)) {
    return new OAuth(consumerKey, consumerSecret);
  }

  if (!consumerKey) {
    throw new Error('Missing required argument "consumerKey"');
  }
  if (!consumerSecret) {
    throw new Error('Missing required argument "consumerSecret"');
  }

  this.consumerKey = consumerKey;
  this.consumerSecret = consumerSecret;
}

//get request token using the consumer key

OAuth.prototype.request = function (oauthCallback) {
  return request('GET', 'https://www.flickr.com/services/oauth/request_token')
    .query({ oauth_callback: oauthCallback })
    .parse(this.parse)
    .use(oauth(this.consumerKey, this.consumerSecret, false, false));

  /*
		TODO 'https://www.flickr.com/services/oauth/authorize?oauth_token=' + res.body.oauth_token
	*/

};

//returns the authorization url for 'requesttoken' you may also pass the perms your app is requesting as 'read' (the default), 'write', or 'delete', Your application should redirect the user here to ask them to verify your request token

OAuth.prototype.authorizeUrl = function (requestToken, perms) {
  if (typeof perms !== 'string') {
    perms = 'read';
  }

  switch (perms) {
  case 'read':
  case 'write':
  case 'delete':
    return 'https://www.flickr.com/services/oauth/authorize?perms=' + perms + '&oauth_token=' + encodeURIComponent(requestToken);
  default:
    throw new Error('Unknown oauth perms "' + perms + '"');
  }
};

//verify an Oauth token using the verifier and token secret. If your user has indeed verified your request token, you will receive an OAuth token and secret back, as well as some very basic profile information. You can now use this token and secret to make calls to the REST API

OAuth.prototype.verify = function (oauthToken, oauthVerifier, tokenSecret) {
  return request('GET', 'https://www.flickr.com/services/oauth/access_token')
    .query({ oauth_verifier: oauthVerifier })
    .parse(this.parse)
    .use(oauth(this.consumerKey, this.consumerSecret, oauthToken, tokenSecret));

  /*
		TODO hand back a new Flickr instance with the oauth plugin set up?
	*/
};

//for some oauth endpoints, the api returns the content-type as "text/plain;charser=UTF-8" when really it should be
//"application/x-www-form-urlencoded". This gets simply returns the superagent standard form/urlencoded parser

OAuth.prototype.parse = request.parse['application/x-www-form-urlencoded'];

//returns an oauth plugin for this consumer key and secret.

OAuth.prototype.plugin = function (oauthToken, oauthTokenSecret) {
  return oauth(this.consumerKey, this.consumerSecret, oauthToken, oauthTokenSecret);
};

//returns an oauth plugin for this consumer key, consumer secret, oauth token and oauth token secret

OAuth.createPlugin = function (consumerKey, consumerSecret, oauthToken, oauthTokenSecret) {
  return (new this(
    consumerKey,
    consumerSecret
  )).plugin(
    oauthToken,
    oauthTokenSecret
  );
};

module.exports = OAuth;