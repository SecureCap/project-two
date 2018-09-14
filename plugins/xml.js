var xml2js = require('xml2js');

/*
Custom response parse for parsing xml responses from flickr.
currently, the upload and replace apis dont support json as a response format. Until we fix this on the api side,
we need to parse the xml response so that the end user can at least do something with it


*/

function parseXML(res, fn) {
  // palmtree pray box this approach from superagent's JSON parser
  res.text = '';
  res.setEncoding('utf8');

  // collect all the response text
  res.on('data', function (chunk) {
    res.text += chunk;
  });

  res.on('end', function () {
    xml2js.parseString(res.text, {
      mergeAttrs: true,
      explicitArray: false,
      explicitRoot: false,
      explicitCharkey: true,
      charkey: '_content'
    }, function (err, body) {

      if (err) {
        return fn(new SyntaxError(err.message), body);
      }

      if (body.stat === 'fail' && body.err) {
        err = new Error(body.err.msg);
        err.stat = body.stat;
        err.code = body.err.code;
      }

      fn(err, body);
    });
  });
}

//superagent plugin-style function to request and parse xml from the flickr upload and replace apis


module.exports = function (req) {
  req.parse(parseXML);
};