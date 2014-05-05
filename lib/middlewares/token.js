
/**
 * Defines app specific middlewares.
 */

'use strict';


/**
 * Sets the `token` property in the request object.
 *
 * @param {Object} options Middleware configuration object. The following
 *  options are currently supported:
 *   - header {String} The name of the header containing the API Token.
 *   - property {String} The name of the property to be set in the 
 *      request object containing the token passed.
 *
 * @return {function(req, res, next)} A middleware function that
 *  checks for the presence of the token header and sets the `token`
 *  property in the request object.
 */
exports = module.exports = function (options) {
  var query = options.query || null;
  var property = options.property || null;

  if (!query) {
    throw('Missconfigured: Unable to get a token from the request!');
  }

  return function (req, res, next) {
    var token = query && req.query && req.query[query] || null;

    if (token) {
      req[property] = token;
    }

    next();
  };
};
