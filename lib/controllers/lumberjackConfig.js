var winston_es = require('winston-elasticsearch');
var elastical = require('elastical');
var winston = require('../../node_modules/winston');
var config = require('../config');

require('winston-loggly');

// *****************************
// load transports configuration
// *****************************
// Loggly
var logglyConf = {
    inputToken : config.LOGGLY_INPUT_TOKEN,
    subdomain : config.LOGGLY_SUBDOMAIN,
    json : true,
    level : config.DEFAULT_LEVEL,
    typeName : 'loggly',
};

// ElasticSearch
var elasticSearchConf = {
    level : config.DEFAULT_LEVEL,
    client : new elastical.Client(config.ELASTICSEARCH_DOMAIN, {
        port : config.ELASTICSEARCH_PORT
    }),
    disable_fields : true,
    typeName : 'elasticsearch'
};

// Console
var consoleConf = {
    colorize : true,
    level : config.DEFAULT_LEVEL,
    typeName : 'console',
    'timestamp':true
};

// Global config levels and colors.
var levels = {
    fatal : 7,
    error : 6,
    warn : 5,
    info : 4,
    custom : 3,
    debug : 2,
    trace : 1
};

var colors = {
    fatal : 'red',
    error : 'yellow',
    warn : 'blue',
    info : 'cyan',
    custom : 'green',
    debug : 'grey',
    trace : 'white'
};

// **********************
// instancianting log
// **********************

var log =
    new (winston.Logger)({
        transports : [
            new (winston.transports.Console)(consoleConf),
            new (winston.transports.Loggly)(logglyConf),
            new winston_es(elasticSearchConf)
        ],
        levels : levels,
        colors : colors
    });

// chalala to loggly work fine
log.transports.loggly.client.config = {};

Object.defineProperty(log.transports.loggly.client.config, 'inputUrl', {
    value : 'https://logs-01.loggly.com/inputs/',
    enumerable : true,
    configurable : true,
});

/** Expose config */
exports = module.exports = log;