'use strict';

var crypto = require('crypto');

var config = require('../config');

var UserStorage = require('../storages/user');

var UserController = {};
exports = module.exports = UserController;


function createSalt() {
  var hash = crypto.createHash('md5');
  var random = Math.floor(Math.random() * 1000000001);
  return hash.update(config.PASSWORD_SALT_BASE + random).digest('base64');
}


function hashPassword(password, salt) {
  salt = salt || createSalt();

  var hash = crypto
    .createHash('sha256')
    .update(salt + password)
    .digest('base64');

  return hash + config.PASSWORD_SALT_SEPARATOR + salt;
}


function checkPassword(user, password) {
  var salt = user.password.split(config.PASSWORD_SALT_SEPARATOR)[1];
  return hashPassword(password, salt) === user.password;
}


UserController.create = function (name, email, password, callback) {
  var user = {
    name : name,
    email : email,
    password : hashPassword(password),
    created : new Date().getTime()
  };

  UserStorage.save(user, callback);
};


UserController.changePassword = function (email, oldPassword, newPassword, callback) {
  UserController.authenticate(email, oldPassword, function (err, user) {
    if (err) {
      return callback(err, null);
    }

    if (!user) {
      // Authentication failed
      return callback(null, null);
    }

    var update = {
      password : hashPassword(newPassword)
    };

    UserStorage.update(user.id, update, callback);
  });
};




UserController.authenticate = function (email, password, callback) {
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


// TODO: remove this calls once we implement a proper user storage
UserController.create('Jarvis Jenkins', 'jarvis@tuntscorp.com', 'senha123');
UserController.create('Mathias', 'mathias.kretschek@tuntscorp.com', 'senha123');

