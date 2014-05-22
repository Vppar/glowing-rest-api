/**
 * Configures the REST API.
 */

/**
 * Configuration object.
 * 
 * @enum
 */
var queries = {};

/** Expose config */
exports = module.exports = queries;

queries.getByUserAndId = function (user, ids) {
    return {
        "query" : {
            "filtered" : {
                "query" : {
                    "queryString" : {
                        "fields" : [
                            "@fields.user"
                        ],
                        "query" : user
                    }
                },
                "filter" : {
                    "bool" : {
                        "must" : {
                            "terms" : {
                                "id" : JSON.parse(ids)
                            }
                        }
                    }
                }
            }
        }
    };
};