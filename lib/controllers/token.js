/**
 * Defines the token-related business logic.
 */

'use strict';

var crypto = require('crypto');

var config = require('../config');
var TokenStorage = require('../storages/token');


var TokenController = {};
exports = module.exports = TokenController;


// TODO
function createToken(userId, salt) {
  var random = Math.floor(Math.random() * 10000001);
  return crypto
    .createHash('sha256')
    .update(random + ':' + userId + ':' + salt)
    .digest('hex');
}


TokenController.create = function (userId, expires, callback) {
  expires = expires || null;

  var token = createToken(userId, config.TOKEN_SALT);
  var refresh = createToken(userId, config.TOKEN_REFRESH_SALT);

  var now = new Date().getTime();

  TokenStorage.save({
    id : token,
    refresh : refresh,
    created : now,
    expires : expires
  }, callback);
};


// TODO: implement this
TokenController.isActive = function (token) {
  return !!token;
};


TokenController.revoke = function (token, callback) {
  TokenStorage.remove(token, callback);
};


