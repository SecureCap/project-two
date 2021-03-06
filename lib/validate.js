//asserts that any of the N keys passed in are found in the obj

module.exports = function (obj, keys) {
  var matches;

  if (!keys) {
    // you shouldn't be calling this function if you're
    // not providing keys, but we won't die if you do
    return;
  }

  obj = obj || {};

  if (typeof keys === 'string') {

    if (!obj.hasOwnProperty(keys)) {
      throw new Error('Missing required argument "' + keys + '"');
    }
  } else {

    matches = keys.filter(function (key) {
      return obj.hasOwnProperty(key);
    });

    if (matches.length === 0) {
      throw new Error('Missing required argument, you must provide one of the following: "' + keys.join('", "') + '"');
    }
  }

};
