
(function () {
  'use strict';

  var crypto = require('crypto');

  exports = module.exports = function (val) {
    return crypto
      .createHash('sha1')
      .update(val)
      .digest('hex');
  };
})();
