'use strict';


var AuthController = require('./auth');
var UserStorage = require('./storages/user');

var UserController = {};
exports = module.exports = UserController;


UserController.create = function (name, email, password, callback) {
  var user = {
    name : name,
    email : email,
    password : AuthController.hashPassword(password),
    created : new Date().getTime()
  };

  UserStorage.save(user, callback);
};


UserController.changePassword = function (email, oldPassword, newPassword, callback) {
  AuthController.authenticate(email, oldPassword, function (err, user) {
    if (err) {
      return callback(err, null);
    }

    if (!user) {
      // Authentication failed
      return callback(null, null);
    }

    var update = {
      password : AuthController.hashPassword(newPassword)
    };

    UserStorage.update(user.id, update, callback);
  });
};


// TODO: remove this calls once we implement a proper user storage
UserController.create('Mathias', 'mathias@tuntscorp.com', 'senha123');

