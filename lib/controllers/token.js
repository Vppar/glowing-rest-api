/**
 * Defines the token-related business logic.
 */

var TokenStorage = require('../storages/token');


var TokenController = {};
exports = module.exports = TokenController;


TokenController.create = function (userId, expiration, callback) {
  var token = createToken(config.TOKEN_SALT);
  var refresh = createToken(config.TOKEN_REFRESH_SALT);
  var expires = expiration ? (now + expiration) : null;

  TokenStorage.save({
    id : token,
    refresh : refresh,
    userId : userId,
    created : now,
    expires : expires
  }, callback);
};


// TODO
TokenController.isActive = function (token) {
  return true;
};


TokenController.revoke = function (token, callback) {
  TokenStorage.remove(token, callback);
};









