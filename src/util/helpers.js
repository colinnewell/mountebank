'use strict';

/** @module */

/**
 * Returns true if obj is a defined value
 * @param {Object} obj - the value to test
 * @returns {boolean}
 */
function defined (obj) {
    return typeof obj !== 'undefined';
}

/**
 * Returns true if obj is a non-null object
 * Checking for typeof 'object' without checking for nulls
 * is a very common source of bugs
 * @param {Object} obj - the value to test
 * @returns {boolean}
 */
function isObject (obj) {
    return typeof obj === 'object' && obj !== null;
}

/**
 * Returns the text used for logging purposes related to this socket
 * @param {Object} socket - the socket
 * @returns {string}
 */
function socketName (socket) {
    let result = socket.remoteAddress;
    if (socket.remotePort) {
        result += `:${socket.remotePort}`;
    }
    return result;
}

/**
 * Returns a deep clone of obj
 * @param {Object} obj - the object to clone
 * @returns {Object}
 */
function clone (obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Returns a new object combining the two parameters
 * @param {Object} defaults - The base object
 * @param {Object} overrides - The object to merge from.  Where the same property exists in both defaults
 * and overrides, the values for overrides will be used
 * @returns {Object}
 */
function merge (defaults, overrides) {
    const result = clone(defaults);
    Object.keys(overrides).forEach(key => {
        if (typeof overrides[key] === 'object' && overrides[key] !== null) {
            result[key] = merge(result[key] || {}, overrides[key]);
        }
        else {
            result[key] = overrides[key];
        }
    });
    return result;
}

module.exports = { defined, isObject, socketName, clone, merge };
