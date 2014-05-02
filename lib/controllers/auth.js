/**
 * Defines authentication logic.
 */
'use strict';

var crypto = require('crypto');


var config = require('../config');

var UserStorage = require('./storage/user');

var AuthController = {};
exports = module.exports = AuthController;


function createSalt() {
  var hash = crypto.createHash('md5');
  var random = Math.floor(Math.random() * 1000000001);
  return hash.update(config.PASSWORD_SALT_BASE + random).digest('base64');
}


function checkPassword(user, password) {
  var salt = user.password.split(config.PASSWORD_SALT_SEPARATOR)[1];
  return AuthController.hashPassword(password, salt) === user.password;
}


AuthController.hashPassword = function (password, salt) {
  salt = salt || createSalt();

  var hash = crypto
    .createHash('sha256')
    .update(salt + password)
    .digest('base64');

  return hash + config.PASSWORD_SALT_SEPARATOR + salt;
};


AuthController.authenticate = function (email, password, callback) {
  UserStorage.getByEmail(email, function (err, user) {
    if (err) {
      return callback(err, null);
    }

    if (user && checkPassword(user, password)) {
      return callback(null, user);
    }

    callback(null, null);
  });
};




