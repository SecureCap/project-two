
// create a new feeds instance
var feeds = new Flickr.Feeds();


// get the most recent public photos
feeds.publicPhotos().then(function (res) {
  console.log(res.body);
}, function (err) {
  console.log('got error', err.message);
});

var request = require('../lib/request');
var validate = require('../lib/validate');

//creates a new feeds service instance, you can use this instance to explore and retrieve public Flickr API data.
//{object} [args] arguments that will be passed along with every feed request
//{string} [args.format=json] the feed response format
//{string} [args.lang=en=us] the language to request for the feed

function Feeds(args) {

  // allow creating a client without `new`
  if (!(this instanceof Feeds)) {
    return new Feeds(args);
  }

  // default arguments
  this._args = Object.assign({ format: 'json', nojsoncallback: 1 }, args);
}

//factory method to create a new request for a feed
Feeds.prototype._ = function (feed, args) {
  return request('GET', 'https://www.flickr.com/services/feeds/' + feed + '.gne')
    .query(this._args)
    .query(args);
};

//returns a list of public content mathcing some criteria

Feeds.prototype.publicPhotos = function (args) {
  return this._('photos_public', args);
};

//returns a list of public content from the contacts, friends & family of a given person

Feeds.prototype.friendsPhotos = function (args) {
  validate(args, 'user_id');

  return this._('photos_friends', args);
};

//returns a list of public favorites for a given user

Feeds.prototype.favePhotos = function (args) {
  // This feed launched with support for id, but was
  // later changed to support `nsid`. This allows us to
  // check both, and fail if neither is specified
  validate(args, ['id', 'nsid']);

  return this._('photos_faves', args);
};

//returns a list of recent discussions in a given group.

Feeds.prototype.groupDiscussions = function (args) {
  validate(args, 'id');

  return this._('groups_discuss', args);
};

//returns a list of things recently added to the pool of a given group

Feeds.prototype.groupPool = function (args) {
  validate(args, 'id');

  return this._('groups_pool', args);
};

//returns a list of recent topics from the forum


Feeds.prototype.forum = function (args) {
  return this._('forums', args);
};

//returns a list of recent comments on a photostream and sets belonging to a given user

Feeds.prototype.recentActivity = function (args) {
  validate(args, 'user_id');

  return this._('activity', args);
};

//returns a list of recent comments that have been commented on by a given person

Feeds.prototype.recentComments = function (args) {
  validate(args, 'user_id');

  return this._('photos_comments', args);
};

module.exports = Feeds;













