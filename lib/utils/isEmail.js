(function () {
  'use strict';

  var EMAIL_PATTERN = new RegExp(
    '^' + 

    // Local part
    '[a-z0-9]+(?:[\._\-\+][a-z0-9]+)*' +

    '\@' +

    // Domain part
    '[a-z0-9\-_]+(?:\.[a-z0-9\-_]+)*' +

    // TLD part
    '(?:\.[a-z]{3,}(?:\.[a-z]{2})?)' +

    '$',

    // Make it case insensitive
    'i'
  );


  /**
   * Checks if the given value is an e-mail address.
   * @param {*} value Value to be checked.
   * @return {boolean} Whether the value is an e-mail address or not.
   */
  exports = module.exports = function (value) {
    return !!(
      value &&
      typeof value === 'string' &&
      value.length <= 254 &&
      EMAIL_PATTERN.test(value)
    );
  };
})();
