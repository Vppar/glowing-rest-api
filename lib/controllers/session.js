/**
 * Defines the session-related business logic.
 */

(function () {

  'use strict';

  var crypto = require('crypto');

  var config = require('../config');
  var SessionStorage = require('../storages/session');


  var SessionController = {};
  exports = module.exports = SessionController;


  /**
   * Creates a token.
   * @param {string} userId User's id.
   * @param {string} salt A random salt.
   * @return {string} A hexadecimal string (our token).
   */
  // TODO
  function createToken(userId, salt) {
    var random = Math.floor(Math.random() * 10000001);
    return crypto
      .createHash('sha256')
      .update(random + ':' + userId + ':' + salt)
      .digest('hex');
  }


  /**
   * @callback SessionController.create~callback
   * @param {Error} err Standard err param for callbacks.
   * @param {object} session The created session data.
   */


  /**
   * Creates a session for the given user.
   * @param {string} userId The id of the user for whom we want to create
   *  a session.
   * @param {number} expires Number of milliseconds that the session takes
   *  to expire.
   * @param {SessionController.create~callback} callback Function to be
   *  called when the operation complets (successful or not).
   */
  SessionController.create = function (userId, expires, callback) {
    expires = expires || null;

    var token = createToken(userId, config.TOKEN_SALT);
    var refresh = createToken(userId, config.TOKEN_REFRESH_SALT);

    var now = new Date().getTime();

    SessionStorage.save({
      token : token,
      refresh : refresh,
      expires : expires,
      userId : userId,
      created : now
    }, callback);
  };


  /**
   * @callback SessionController.get~callback
   * @param {Error} err Standard callback err param.
   * @param {object} session Session's data or null if no session is found
   *  for the given token.
   */


  /**
   * Gets session data for the given token.
   * @param {string} token Session's id/token.
   * @param {SessionController.get~callback} callback Function to be called
   *  once the operation finishes (successful or not).
   */
  SessionController.get = function (token, callback) {
    SessionStorage.get(token, callback);
  };


  /**
   * Creates a new session based on an existing one.
   * @param {string} token Session's id/token.
   * @param {string} refreshToken Session's refresh token.
   * @param {SessionController.create~callback} callback A function
   *  to be called when the operation completes (successful or not).
   *  Has the same signature as the callback for #create().
   */
  SessionController.refresh = function (token, refreshToken, callback) {
    SessionStorage.get(token, function (err, oldSession) {
      if (err) {
        return callback(err, null);
      }

      // No session found with the given token or its refresh token does not
      // match the one passed in the request.
      if (
        !oldSession ||
        oldSession.refresh !== refreshToken
      ) {
        return callback(null, null);
      }

      // A session has been found. We'll destroy it before creating the new one.
      SessionController.destroy(token, function (err) {
        if (err) {
          return callback(err, null);
        }

        // Old session destroyed. Create the new one.
        SessionController.create(
          oldSession.userId,
          oldSession.expires,
          function (err, newSession) {
            if (err) {
              return callback(err, null);
            }

            callback(null, newSession);
          }); // create
      }); // remove
    }); // get
  };


  /**
   * Checks if the given token represents an active session.
   * Still needs to be implemented.
   */
  // TODO: implement this
  SessionController.isActive = function (token) {
    return !!token;
  };


  /**
   * @callback SessionController.destroy~callback
   * @param {Error} err Standard error object passed to callbacks.
   */


  /**
   * Destroys the session associated with the given token.
   * @param {string} token Session's id/token.
   * @param {SessionController.destroy~callback} callback Function to be
   *  called when the operation complets (successful or not).
   */
  SessionController.destroy = function (token, callback) {
    SessionStorage.remove(token, callback);
  };

})();
