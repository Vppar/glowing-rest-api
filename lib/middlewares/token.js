/**
 * Defines a middleware that extracts an access token from the request and
 * exposes its data for easier access.
 */

(function () {
  'use strict';

  var TokenController = require('../controller/token');

  function getToken(req) {
    return req.query && req.query[config.TOKEN_QUERY_PARAM];
  }


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
    var header = options.header || null;
    var query = options.query || null;
    var property = options.property || null;

    if (!header && !query) {
      throw('Missconfigured: Unable to get a token from the request!');
    }

    return function (req, res, next) {
      var token = null;

      if (!token && header) {
        token = req.header && req.header[header] || null;
      }

      if (!token && query) {
        token = req.query && req.query[query] || null;
      }

      if (token) {
        TokenController.get(token, function (err, session) {
          if (err) {
            return next(err);
          }

          req[property] = session;
          next();
        });
      } else {
        next();
      }
    };
  };
})();
