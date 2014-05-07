'use strict';

var lumberjackStorage = require('../storages/lumberjack');
var LumberjackController = {};

/** expose LumberjackController*/
exports = module.exports = LumberjackController;

LumberjackController.logIt = function (toLog) {

    toLog.levelName = toLog.level;
    // if level dosn't exist we force custom level.
    if (lumberjack.log.levels[toLog.level]) {
        lumberjack.log[toLog.level](toLog.message, toLog);
    } else {
        lumberjack.log.custom(toLog.message, toLog);
    }

};
