
'use strict';

var HttpStatus = require('../utils/httpStatus');

/**
 * Checks if a refresh token is defined in the request.
 * @return {function (req, res, next)} Configured middleware function.
 */
exports = module.exports = function () {
  return function (req, res, next) {
    if (!req.query.refresh) {
      res.json(HttpStatus.BAD_REQUEST, {
        message : 'Refresh token required'
      });
      return;
    }

    next();
  };
};
