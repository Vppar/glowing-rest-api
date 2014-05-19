
(function () {
  'use strict';

  var UserController = require('../controllers/user');


  exports = module.exports = function (options) {
    options = options || {};

    var sessionProperty = options.sessionProperty || null;
    var userProperty = options.userProperty || 'user';

    if (!sessionProperty) {
      throw('Missconfigured: unable to check for a session!');
    }

    return function(req, res, next) {
      var session = req[sessionProperty];

      // No session information found
      if (!session) {
        next();
        return;
      }

      var userId = req.session.user;

      UserController.get(userId, function (err, user) {
        if (err) { return next(err); }

        req[userProperty] = user;
        next();
      });
    };
  };
})();
