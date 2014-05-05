
/**
 * Configures the REST API.
 */


/**
 * Configuration object.
 * @enum
 */
var config = {};


/** Expose config */
exports = module.exports = config;


config.TOKEN_EXPIRATION_TIME = 7 * 24 * 60 * 60; // 7 days to seconds
config.TOKEN_HEADER = 'API-Token';
config.TOKEN_PROPERTY = 'token';
config.TOKEN_QUERY_PARAM = 'token';
config.TOKEN_SALT = 'temp-development-token-salt';
config.TOKEN_REFRESH_SALT = 'temp-development-token-refresh-salt';

// TODO: this string should not be the same in development and production
// environments
config.PASSWORD_SALT_BASE = 'randomstring';

config.PASSWORD_SALT_SEPARATOR = ':';


config.SSL_CERTIFICATE = null;
config.SSL_KEY = null;
