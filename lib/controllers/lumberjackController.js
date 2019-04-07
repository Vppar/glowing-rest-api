(function () {
    'use strict';

    var lumberjack = require('./lumberjackConfig');
    var LumberjackStorage = require('../storages/lumberjackStorage');

    /** expose LumberjackController */
    var LumberjackController = {};

    exports = module.exports = LumberjackController;

    /**
     * Log messages on all transports.
     * 
     * @param {user} user id
     * @param {toLog} Object -
     *            https://github.com/Tunts/glowing-rest-api/wiki/core:Log. 
     * @param {callback} function - execute after log message.
     */
    LumberjackController.logIt = function (user, toLog, callback) {
        var logs = [];
        var successful = [];
        if (toLog.length) {
            logs = logs.concat(toLog);
        } else {
            logs.push(toLog);
        }

        var total = logs.length;
        var sent = [];

        function callbackError (err) {
            if (err && err.transport.typeName == 'elasticsearch') {
                // debug
                // console.log(err);
                callback(err, null);
            }
        }

        // On log event for every transport.
        lumberjack.on('logging', function (transport, level, msg, meta) {
            if (transport.typeName === 'elasticsearch') {
                sent.push(meta.id);
                if (sent.length > 0 && sent.length === total) {
                    var logIds = JSON.stringify(successful);
                    setTimeout(function () {
                        LumberjackController.exists(user, logIds, function (err, result) {
                            if (result) {
                                callback(null, result);
                            }
                            if (err) {
                                callback(err, null);
                            }
                        });
                    }, 1000);
                }
            }
        });

        // logIt
        for ( var ix in logs) {
            var log = logs[ix];
            log.user = user;
            log.levelName = log.level;

            if (lumberjack[log.level]) {
                lumberjack[log.level](log.message, log, callbackError);
            } else {
                lumberjack.custom(log.message, log, callbackError);
            }
            successful.push(log.id);
        }

    };

    /**
     * Verifies that the ids passed by paramatro exist in elasticsearch.
     * 
     * @param {string} user - user base to search logs.
     * @param {array} array - Array with ids that will be search.
     * @param {function} function - execute search logs.
     * 
     * @return {array} - all ids found.
     */
    LumberjackController.exists = function (user, ids, callback) {

        LumberjackStorage.getLogByIdAndUser(user, ids, function (err, log) {
            if (err) {
                return callback(err, null);
            }

            // result with all ids found.
            var result = [];
            if (log) {
                for ( var ix in log) {
                    result.push(log[ix]['_source']['@fields']['id']);
                }
                return callback(null, result);
            }

            // Nothing found.
            callback(null, null);
        });
    };
})();
