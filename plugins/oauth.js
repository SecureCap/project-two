var OAuth = require('../lib/oauth');

//creates a superagent plugin to sign api calls using oauth 1.0
//you must provide oauthtoken and oauthtokensecret when signing
//calls to the flickr api, or you may pass false to explicityly omit one or both of these parameters, as is the case for the oauth 1.0 flow in oauth.js

module.exports = function (consumerKey, consumerSecret, oauthToken, oauthTokenSecret) {
  var oauth = new OAuth(consumerKey, consumerSecret);

  if (!oauthToken && oauthToken !== false) {
    throw new Error('Missing required argument "oauthToken"');
  }
  if (!oauthTokenSecret && oauthTokenSecret !== false) {
    throw new Error('Missing required argument "oauthTokenSecret"');
  }

  return function (req) {
    // we need to overwrite .end to make sure we
    // sign the request at the last possible moment
    var _end = req.end;

    req.end = function (fn) {

      // sign the url with token secret unless it was
      // explicitly omitted
      if (oauthTokenSecret !== false) {
        this.param({
          oauth_signature: oauth.signature(this.method, this.url, this.params, oauthTokenSecret)
        });
      } else {
        this.param({
          oauth_signature: oauth.signature(this.method, this.url, this.params)
        });
      }

      // call the original
      _end.call(this, fn);
    };

    // always add our oauth params
    req.param(oauth.params());

    // add the oauth token unless explicitly omitted
    if (oauthToken !== false) {
      req.param({ oauth_token: oauthToken });
    }

  };
};