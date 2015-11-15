'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var Client = require('./client');
var defaults = require('./defaults');
var pool = require('./pool');
var Connection = require('./connection');

function PG(clientConstructor) {
    EventEmitter.call(this);
    this.defaults = defaults;
    this.Client = pool.Client = clientConstructor;
    this.Query = this.Client.Query;
    this.pools = pool;
    this.Connection = Connection;
    this.types = require('./modules/pg-types');
    this.cursor = require('./modules/pg-cursor');
    this.stream = require('./modules/pg-query-stream');
    this.copy = require('./modules/pg-copy-streams');
}

util.inherits(PG, EventEmitter);

PG.prototype.end = function () {
    var self = this;
    var keys = Object.keys(self.pools.all);
    var count = keys.length;
    if (count === 0) {
        self.emit('end');
    } else {
        keys.forEach(function (key) {
            var pool = self.pools.all[key];
            delete self.pools.all[key];
            pool.drain(function () {
                pool.destroyAllNow(function () {
                    count--;
                    if (count === 0) {
                        self.emit('end');
                    }
                });
            });
        });
    }
};

PG.prototype.connect = function (config, callback) {
    if (typeof config === "function") {
        callback = config;
        config = null;
    }
    var pool = this.pools.getOrCreate(config);
    pool.connect(callback);
    if (!pool.listeners('error').length) {
        // propagate errors up to pg object
        pool.on('error', this.emit.bind(this, 'error'));
    }
};

// cancel the query run by the given client
PG.prototype.cancel = function (config, client, query) {
    var c = config;
    // allow for no config to be passed
    if (typeof c === 'function') {
        c = defaults;
    }
    var cancellingClient = new this.Client(c);
    cancellingClient.cancel(client, query);
};

module.exports = new PG(Client);
