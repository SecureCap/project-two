var request = require('superagent');
var parse = require('querystring').parse;


//subclass superagents Request class so that we can add our own functionality to it

function Request(method, url) {
  request.Request.call(this, method, url);

  // keep track of all request params for oauth signing
  this.params = {};
}

Request.prototype = Object.create(request.Request.prototype);

//override .query() to also add query string params to our params hash.

Request.prototype.query = function (val) {
  if (typeof val === 'string') {
    Object.assign(this.params, parse(val));
  } else {
    Object.assign(this.params, val);
  }

  // super
  return request.Request.prototype.query.call(this, val);
};

//override .field() to also add fields to our params hash

Request.prototype.field = function (key, val) {
  if (typeof key === 'string') {
    this.params[key] = val;
  } else {
    Object.assign(this.params, key);
  }

  // super
  return request.Request.prototype.field.call(this, key, val);
};

//convenience method to either call .query() or .field() based on this request method

Request.prototype.param = function (obj) {
  switch (this.method) {
  case 'POST':
    return this.field.call(this, obj);
  default:
    return this.query.call(this, obj);
  }
};

//mimic the request factory method that superagent exports

exports = module.exports = function (method, url) {
  // callback
  if ('function' === typeof url) {
    return new exports.Request('GET', method).end(url);
  }

  // url first
  if (1 === arguments.length) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
};

//re-export all of the things superagents exports

Object.assign(exports, request);


exports.Request = Request;


