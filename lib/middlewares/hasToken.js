
'use strict';

var HttpStatus = require('../enum/httpStatus');
var SessionController = require('../controllers/session');

/**
 * Checks if a token is defined in the request and, optionally, validates it.
 *
 * @param {object?} options Middleware configuration object.
 * @param {boolean?} options.validate If true, checks if the token is still
 *  valid.
 *
 * @return {function (req, res, next)} Configured middleware function.
 */
exports = module.exports = function (options) {
  options = options || {};

  return function (req, res, next) {
    if (!req.token) {
      res.json(HttpStatus.BAD_REQUEST, {
        message : 'Token required'
      });
      return;
    }

    if (options.validate) {
      SessionController.checkToken(req.token, function (err, valid) {
        if (err) {
          res.json(HttpStatus.INTERNAL_SERVER_ERROR, err);
          return;
        }

        if (!valid) {
          res.json(HttpStatus.UNAUTHORIZED, {
            message : 'Invalid token'
          });
          return;
        }

        // Token is valid
        next();
      });
    } else {
      next();
    }
  };
};
