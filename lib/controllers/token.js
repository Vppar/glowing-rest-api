/**
 * Defines the token-related business logic.
 */

'use strict';

var config = require('./config');
var TokenStorage = require('../storages/token');


var TokenController = {};
exports = module.exports = TokenController;


// TODO
function createToken() {
  return 'oops';
}


TokenController.create = function (userId, expiration, callback) {
  var token = createToken(config.TOKEN_SALT);
  var refresh = createToken(config.TOKEN_REFRESH_SALT);

  var now = new Date().getTime();
  var expires = expiration ? (now + expiration) : null;

  TokenStorage.save({
    id : token,
    refresh : refresh,
    userId : userId,
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









