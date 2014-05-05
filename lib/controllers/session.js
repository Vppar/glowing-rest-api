/**
 * Defines the session-related business logic.
 */

'use strict';

var crypto = require('crypto');

var config = require('../config');
var SessionStorage = require('../storages/session');


var SessionController = {};
exports = module.exports = SessionController;


// TODO
function createToken(userId, salt) {
  var random = Math.floor(Math.random() * 10000001);
  return crypto
    .createHash('sha256')
    .update(random + ':' + userId + ':' + salt)
    .digest('hex');
}


SessionController.create = function (userId, expires, callback) {
  expires = expires || null;

  var token = createToken(userId, config.TOKEN_SALT);
  var refresh = createToken(userId, config.TOKEN_REFRESH_SALT);

  var now = new Date().getTime();

  SessionStorage.save({
    id : token,
    refresh : refresh,
    created : now,
    expires : expires
  }, callback);
};


// TODO: implement this
SessionController.isActive = function (token) {
  return !!token;
};


SessionController.revoke = function (token, callback) {
  SessionStorage.remove(token, callback);
};


