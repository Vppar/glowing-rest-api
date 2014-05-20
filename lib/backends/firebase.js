
(function () {
  'use strict';

  var Firebase = require('firebase');

  var FirebaseBackend = {};

  var baseRef = new Firebase(config.FIREBASE_URI);


  function getRef(path) {
    return path ? baseRef.child(path) : baseRef;
  }


  FirebaseBackend.refs = {
    base : baseRef
  };


  FirebaseBackend.get = function (path, callback) {
    var ref = getRef(path);

    ref.once(
      'value',

      // handle value
      function (snapshot) {
        if (snapshot) {
          callback(null, snapshot.val());
          return;
        }

        callback(null, null);
      },

      // handle error
      function (err) {
        callback(err, null);
      }
    );
  };


  FirebaseBackend.set = function (path, value, priority, callback) {
    var ref = getRef(path);

    function onComplete(err) {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null);
    }

    if (priority !== null) {
      ref.setWithPriority(value, priority, onComplete);
    } else {
      ref.set(value, onComplete);
    }
  };


  FirebaseBackend.remove = function (path, callback) {
    FirebaseBackend.set(path, null, null, callback);
  };


  FirebaseBackend.update = function (path, value, callback) {
    var ref = getRef(path);

    ref.update(value, function (err) {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, null);
    });
  };

})();
