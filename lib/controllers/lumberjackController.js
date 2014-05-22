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
     * @param {toLog} Object -
     *            https://github.com/Tunts/glowing-rest-api/wiki/core:Log.
     * @param {callback} function - execute after log message.
     */
    LumberjackController.logIt = function (toLog, callback) {

        var logs = [];

        if (toLog.length) {
            logs = logs.concat(toLog);
        } else {
            logs.push(toLog);
        }

        var successful = [];
        var failed = [];

        //declare callback
        var callbackN = function (err, log) {
            if (err) {
                failed.push(log.id);
            }
        };
        
        //logIt
        for ( var ix in logs) {
            var log = logs[ix];
            log.levelName = log.level;

            if (lumberjack.levels[log.level]) {
                lumberjack[log.level](log.message, log, callbackN);
            } else {
                lumberjack.custom(log.message, log, callbackN);
            }
            successful.push(log.id);
        }

        //verify for response
        if (failed.length === 0 ) {
            callback(null, successful);
        } else {
            callback(null, null);
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
