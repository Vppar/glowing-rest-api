(function () {
  'use strict';

  var RequestError = {};

  exports = module.exports = RequestError;


  RequestError.AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED';

  RequestError.INVALID_TOKEN = 'INVALID_TOKEN';

  RequestError.MISSING_REQUIRE_PARAMETER = 'MISSING_REQUIRED_PARAMETER';

  RequestError.SERVER_ERROR = 'SERVER_ERROR';

})();
