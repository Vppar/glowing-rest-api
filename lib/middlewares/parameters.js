(function () {
  'use strict';

  var _ = require('underscore');

  var HttpStatus = require('../enum/httpStatus');
  var RequestError = require('../enum/requestError');

  function getUndefinedParams(target, params) {
    return _.filter(params, function (param) {
      return _.isUndefined(target[param]);
    });
  }


  exports = module.exports = function (options) {
    options = options || {};

    return function (req, res, next) {
      var missing =
        options.body && getUndefinedParams(req.body, options.body) ||
        options.query && getUndefinedParams(req.query, options.query) ||
        options.header && getUndefinedParams(req.header, options.header) ||
        null;

      if (missing.length) {
        res.json(HttpStatus.BAD_REQUEST, {
          message : 'Missing parameters: ', + missing.join(', '),
          code : RequestError.MISSING_PARAMETERS
        });

        return;
      }

      next();
    };
  };
})();
