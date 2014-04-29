
/**
 * Defines app specific middlewares.
 */

var middleware = {};

exports = module.exports = middleware;



/**
 * Sets the `token` property in the request object.
 *
 * @param {String} header The name of the header containing the token.
 *  Defaults to `API-Token`.
 * @param {String} property The name of the property set in the request
 *  object. Defaults to `token`.
 *
 * @return {function(req, res, next)} A middleware function that
 *  checks for the presence of the token header and sets the `token`
 *  property in the request object.
 */
middleware.token = function (header, property) {
  header = header || 'API-Token';
  property = property || 'token';

  return function (req, res, next) {
    var token = req.headers && req.headers[header];

    if (token) {
      req[property] = token;
    }

    next();
  };
};
