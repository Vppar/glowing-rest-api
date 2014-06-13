(function () {
  'use strict';

  var crypto = require('crypto');

  var config = require('../config');

  var UserStorage = require('../storages/user');

  var UserController = {};
  exports = module.exports = UserController;


  /**
   * Creates a random salt string.
   * @return {string} A base64-encoded random string.
   * @private
   */
  function createSalt() {
    var hash = crypto.createHash('md5');
    var random = Math.floor(Math.random() * 1000000001);
    return hash.update(config.PASSWORD_SALT_BASE + random).digest('base64');
  }


  /**
   * Hashes the given password (or string).
   * @param {string} password The password to be hashed.
   * @param {string?} salt A salt to append to the password to increase
   *  hash's sacurity. If none is given, a new one will be generated.
   * @return {string} A base64-encoded hash containing the encrypted
   *  password and the used salt, proper for safely storing passwords
   *  in the database.
   *
   * @private
   */
  function hashPassword(password, salt) {
    salt = salt || createSalt();

    var hash = crypto
      .createHash('sha256')
      .update(salt + password)
      .digest('base64');

    return hash + config.PASSWORD_SALT_SEPARATOR + salt;
  }


  /**
   * Checks that the given password matches the given hash.
   * @param {string} hash A hash of a password + salt as returned by
   *  `hashPassword()`.
   * @param {string} password The raw password to be check against
   *  the given hash.
   * @return {boolean} `true` if the given password matches the
   *  given hash. `false` otherwise.
   *
   * @private
   */
  function checkPassword(hash, password) {
    var salt = hash.split(config.PASSWORD_SALT_SEPARATOR)[1];
    return hashPassword(password, salt) === hash;
  }


  /**
   * @callback authenticateByEmail~callback
   * @param {error|string?} err If an error occurs during the authentication
   *  process, an object containig more information about it will be passed
   *  as the firs param. Is `null` if everything goes as expected.
   * @param {object} user If successfully authenticated, the user data is
   *  passed as the second parameter to the callback. If the authentication
   *  fails, or if an error occurs, 'user' will be `null`.
   */


  /**
   * Authenticates a user using its e-mail as username.
   * @param {string} email User's e-mail.
   * @param {string} password User's password (raw).
   * @param {authenticateByEmail~callback} callback A function that will be
   *  called once the authentication completes (successful or not).
   *
   * @private
   */
  function authenticateByEmail(email, password, callback) {
    UserStorage.get(email, function (err, user) {
      if (err) { return callback(err, null); }

      if (user && checkPassword(user.password, password)) {
        // TODO: log user authentication (user, email, datetime, ip, etc.)
        return callback(null, user);
      }

      callback(null, null);
    });
  }


  /**
   * @callback UserController.create~callback
   * @param {Error} err An error object containing details about the error,
   *  if one occurred while creating the user.
   * @param {object} user Newly created user's data. `null` if an error
   *  occurred while creating the account.
   */


  /**
   * Creates a new user with the given credentials.
   * @param {string} name User's name.
   * @param {string} email User's e-mail address.
   * @param {string} password User's raw password.
   * @param {UserController.create~callback} callback Function that will be
   *  called when the operation finishes (successful or not).
   */
  UserController.create = function (name, email, password, callback) {
    var user = {
      name : name,
      email : email,
      password : hashPassword(password),
      created : new Date().getTime()
    };

    UserStorage.save(user, callback);
  };


  /**
   * @callback UserController.changePassword~callback
   * @param {Error?} err Error object containing details about an error
   *  that occurred during the password change, if any. If no error
   *  occurred, this will be `null`.
   */


  /**
   * Updates the user's password.
   * @param {object} credentials User's credentials.
   * @param {string} newPassword User's raw new password.
   * @param {UserController.changePassword~callback} callback Function to be
   *  called when the operation completes (successful or not).
   */
  UserController.changePassword = function (credentials, newPassword, callback) {
    UserController.authenticate(credentials, function (err, user) {
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


  /**
   * @callback UserController.authenticate~callback
   * @param {Error} err Default callback first param containig error details
   *  if one occurs.
   * @param {object} user Authenticated user's data.
   */


  /**
   * Authenticates a user with the given credentials. Can implement
   * different authentication strategies based on the credentials.
   * @param {object} credentials Object containing user credentials.
   * @param {UserController.authenticate~callback} callback Function that
   *  will be called when the operation complets (successful or not).
   */
  UserController.authenticate = function (credentials, callback) {
    if (!credentials) {
      return callback(null, null);
    }

    if (credentials.email && credentials.password) {
      authenticateByEmail(credentials.email, credentials.password, callback);
      return;
    }

    callback(null, null);
  };

})();
