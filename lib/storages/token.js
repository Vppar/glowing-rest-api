/**
 * Defines methods for storing and retrieving token-related data.
 */

var MemmoryBackend = require('./backends/memmory');


var TokenStorage = {};
exports = module.exports = TokenStorage;


var TOKEN_BUCKET = 'tokens';


function getId(tokenOrId) {
  return tokenOrId && tokenOrId.token || tokenOrId;
}


/**
 * Gets data associated with a token.
 * @param {String} token Token we want to get data for.
 * @param {function(err, data)} callback Callback to be called when the
 *  operation completes. It receives an error (if any) and the full
 *  data object associated with the given token. This object is `null`
 *  if no data is found for the given token.
 */
TokenStorage.get = function (token, callback) {
  MemmoryBackend.get(TOKEN_BUCKET, token, callback);
};


/**
 * Saves a new token.
 * @param {Object} data Token data.
 * @param {function(err, token, data)} callback Callback to be called with the result
 *  of the operation and the stored data. The callback receives an error (if
 *  any), the stored token and the full data object associated with it.
 */
TokenStorage.save = function (token, callback) {
  MemmoryBackend.insert(TOKEN_BUCKET, token, callback);
};


/**
 * Updates the data associated with a token. Used mainly to revoke tokens.
 * @param {(Object|String)} token Token being updated.
 * @param {Object} update Object containing the properties to update.
 * @param {function(err, update)} callback Callback to be called when the
 *  operation completes. It receives an error (if any) and the full
 *  data object associated with the given token. This object is `null` if
 *  the token does not exist.
 */
TokenStorage.update = function (tokenOrId, update, callback) {
  MemmoryBackend.update(TOKEN_BUCKET, getId(tokenOrId), update, callback);
};


/**
 * Removes the data associated with a token. This will delete all data related
 * to the token.
 * @param {(Object|String)} token Token to remove.
 * @param {function(err, data)} callback Callback to be called when the
 *  operation completes. It receives an error (if any), the removed token
 *  itself and the full data object associated with it. If the token is not
 *  found this object will be `null`.
 */
TokenStorage.remove = function (tokenOrId, callback) {
  MemmoryBackend.remove(TOKEN_BUCKET, getId(tokenOrId), callback);
};

