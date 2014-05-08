'use strict';

var LogStorage = require('../storages/log');

/** expose LogController*/
var LogController = {};
exports = module.exports = LogController;

LogController.logIt = function (toLog, callback) {
    
    toLog.levelName = toLog.level;
    
    // if level dosn't exist we force custom level.
    if (LogStorage.levels[toLog.level]) {
        LogStorage[toLog.level](toLog.message, toLog, callback);
    } else {
        LogStorage.custom(toLog.message, toLog, callback);
    }

};
