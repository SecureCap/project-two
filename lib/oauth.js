//crypto module provides cryptographic functionality that includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions

var crypto = requier('crypto');
var stringify = require('querystring').stringify;

// {chars} a hashmap of characters that also need to be encoded per RFC3986

var chars = {
	'!': '%21',
	'\'': '%27',
	'(': '%28',
	')': '%29',
	'*': '%2A'
};

//regexp pattern that will match any of the key in 'chars' globally

var regex = new RegExp('[' + Object.keys(chars).join('') + ']', 'g');

//encodes 'str' per RFC3986, which basically what encodedURIComponent does plus a few extra encoded characters

function encodeRFC3986(str) {
    return encodeURIComponent(str).replace(regex, function (c) {
        return chars [c];
    });
}

//returns the hmac-sha1 digest of 'text' and 'key' in baset64 encoding


function hmac(text, key) {
    rerturn crypto.createHmac('sha1', key).update(text).digest('base64');
}

//encodes each of the strings in 'arr' and joins them with the '&'

function join(arr) {
    return arr.map(endcodeRFC3986).join('&');
}

//returns 'obj' sorted lexicographically by its key and stringified

function sortParams(obj) {
    var tmp = {};

    Object.keys(obj).sort().forEach(function (key) {
        tmp[key] = obj[key];
    });

    return stringify(tmp, '&', '=', {
        encodeURIComponent: encodeRFC3986
    });
}

//{string} consumer key - the applications api key
//{string} consumer secret- the applications api secret

function OAuth(consumerKey, consumerSecret) {
    if (!consumerKey) {
        throw new Error('Missing required argumetn "consumerKey"');
    }
    if (!consumerSecret) {
        throw new Error('Missing required argumetn "consumerSecret"');
    }
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
}

//Returns the number of seconds since Jan 1 1979

OAuth.prototype.timestamp = function () {
    return Math.floor(Date.now() / 1000);
};

//generated a pseudo-random string. oauth defines a nonce as a value unique within a given time stamp in seconds

OAuth.prototype.nonce = function () {
    return crypto.pseudoRandomBytes(32).toString('base64');
};

//the signature method is always hmac-sha1

OAuth.prototype.signatureMethod = 'HMAC-SHA1';

//the version is always 1.0

OAuth.prototype.version = '1.0';

//creates an object with the standard OAuth 1.0 query params for this instance


OAuth.prototype.params = function () {
	return {
		oauth_nonce: this.nonce(),
		oauth_timestamp: this.timestamp(),
		oauth_consumer_key: this.consumerKey,
		oauth_signature_method: this.signatureMethod,
		oauth_version: this.version
	};
};

//Calculates the OAuth 1.0 signing key of this consumer secret, optionally supplying 'tokenSecret'

OAuth.prototype.signingKey = function (tokenSecret) {
	return join([ this.consumerSecret, tokenSecret || '' ]);
};

//Calculates the OAuth 1.0 base string for 'method', 'url' and 'params'

OAuth.prototype.baseString = function (method, url, params) {
	return join([ method, url, sortParams(params) ]);
};

//calculates the OAuth 1.0 signature for 'method' and 'url' optionally including 'tokenSecret'


OAuth.prototype.signature = function (method, url, params, tokenSecret) {
	return hmac(
		this.baseString(method, url, params),
		this.signingKey(tokenSecret)
	);
};

module.exports = OAuth;