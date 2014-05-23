'use strict';

var crypto = require('crypto');

var FirebaseBackend = require('../backends/firebase');

var isEmail = require('../utils/isEmail');

var usersRef = FirebaseBackend.refs.base.child('user');
var idsRef = FirebaseBackend.refs.base.child('emailToIds');


var UserStorage = {};
exports = module.exports = UserStorage;


// Encode an email address into something we can use in a Firebase path
function encodeEmail(email) {
  return crypto
    .createHash('sha1')
    .update(email)
    .digest('hex');
}


function createId() {
  return 'randomid' + Math.floor(Math.random() * 1000000001);
}


function getId(userOrId) {
  return userOrId && userOrId.id || userOrId;
}


UserStorage.getId = function (email, callback) {
  FirebaseBackend.get(idsRef.child(encodeEmail(email)), callback);
};


UserStorage.get = function (idOrEmail, callback) {
  var email = isEmail(idOrEmail) && idOrEmail;
  var id = email || idOrEmail;

  if (email) {
    UserStorage.getId(email, function (err, id) {
      if (err) { return callback(err, null); }
      UserStorage.get(id, callback);
    });
  } else {
    FirebaseBackend.get(usersRef.child(id), callback);
  }
};


UserStorage.save = function (user, callback) {
  var id = createId();

  usersRef.child(id).transaction(function (current) {
    if (!current) {
      user.id = id;
      return user;
    } else {
      // Id already in use, try again and abort current transaction.
      UserStorage.save(user, callback);
    }
  }, function (err, committed) {
    if (err) {
      return callback(err, null);
    }
    
    if (committed) {
      UserStorage.setEmailToId(user.email, id, function (err) {
        if (err) {
          return callback(err, null);
        }

        callback(null, user);
      });
    }
  });
};


UserStorage.setEmailToId = function (email, id, callback) {
  // We use an email hash instead of the e-mail itself because of Firebase's
  // character restrictions for its resource paths. This is more reliable than
  // replacing dots with underscores as we were doing until now.
  idsRef.child(encodeEmail(email)).set(id, callback);
};


UserStorage.update = function (userOrId, update, callback) {
  var id = getId(userOrId);
  update.updated = new Date().getTime();

  FirebaseBackend.update(usersRef.child(id), update, callback);
};


UserStorage.remove = function (userOrId, callback) {
  // TODO
  callback(null, null);
};
