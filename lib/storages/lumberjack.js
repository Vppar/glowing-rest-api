var winston = require('../../node_modules/winston');
//var elastical = require('elastical');
var winston_es = require('winston-elasticsearch');

require('winston-loggly');

//*****************************
//load transports configuration
//*****************************
var transports = require('./lumberjack-transports');

// Global config levels and colors.
var config = {
    levels : {
        fatal : 7,
        error : 6,
        warn : 5,
        info : 4,
        custom : 3,
        debug : 2,
        trace : 1
    },
    colors : {
        fatal : 'red',
        error : 'yellow',
        warn : 'blue',
        info : 'cyan',
        custom : 'green',
        debug : 'grey',
        trace : 'white'
    }
};

//**********************
// instancianting log with all needed trasnports
//**********************

var log =
    new (winston.Logger)({
        transports : [
            new (winston.transports.Console)(transports.consoleConf),
            new (winston.transports.Loggly)(transports.logglyConf),
            new winston_es(transports.elasticSearchConf)
        ],
        levels : config.levels,
        colors : config.colors
    });

// chalala to configure loggly
log.transports.loggly.client.config = {};

Object.defineProperty(log.transports.loggly.client.config, 'inputUrl', {
    value : 'https://logs-01.loggly.com/inputs/',
    enumerable : true,
    configurable : true,
});

/** Expose config */
exports = module.exports = log;