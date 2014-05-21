(function () {
    'use strict';

    var lumberjack = require('./lumberjackConfig');
    var LumberjackStorage = require('../backends/lumberjackStorage');
    /** expose LumberjackController */
    var LumberjackController = {};
    exports = module.exports = LumberjackController;

    /**
     * Log messages on all transports.
     * 
     * @param {toLog} Object -
     *            https://github.com/Tunts/glowing-rest-api/wiki/core:Log.
     * @param {callback} function - execute after log message.
     */
    LumberjackController.logIt = function (toLog, callback) {
        toLog.levelName = toLog.level;

        if (lumberjack.levels[toLog.level]) {
            lumberjack[toLog.level](toLog.message, toLog, callback);
        } else {
            lumberjack.custom(toLog.message, toLog, callback);
        }

    };

    /**
     * Verifies that the ids passed by paramatro exist in elasticsearch.
     * 
     * @param {array} array - Array with ids that will be search.
     * @param {function} function - execute search logs.
     * 
     * @return {array} - all ids found.
     */
    LumberjackController.exists = function (user, ids, callback) {

        for ( var ix in ids) {
            LumberjackStorage.getLogByIdAndUser(user, ids[ix], function (err, log) {
                if (err) {
                    return callback(err, null);
                }

                if (log) {
                    return callback(null, log);
                }

                callback(null, null);
            });
        }

    };
})();
