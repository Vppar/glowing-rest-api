(function () {
  'use strict';

  var HttpStatus = require('../enum/httpStatus');
  var RequestError = require('../enum/requestError');

  function checkParams(res, target, params) {
    if (!target || !params) {
      return false;
    }

    var len = params.length;
    var i = 0;
    var param = null;

    for (i; i < len; i += 1) {
      param = params[i];
      if (!target[param]) {
        res.json(HttpStatus.BAD_REQUEST, {
          message : 'Missing parameter: ' + param,
          code : RequestError.MISSING_REQUIRED_PARAMETER
        });
        return false;
      }
    }

    return true;
  }


  exports = module.exports = function (options) {
    var bodyParams, queryParams, headerParams;

    if (typeof options === 'string') {
      bodyParams = queryParams = headerParams =
          Array.prototype.slice.apply(arguments, 0);
    } else if (Array.isArray(options)) {
      bodyParams = queryParams = headerParams = options;
    } else {
      options = options || {};
      bodyParams = options.body;
      queryParams = options.query;
      headerParams = options.header;
    }


    return function (req, res, next) {
      if(
        checkParams(res, req.body, bodyParams) &&
        checkParams(res, req.query, queryParams) &&
        checkParams(res, req.header, headerParams)
      ) {
        next();
      }
    };

  };
})();
