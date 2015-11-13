'use strict';

var Promise = require('bluebird');
var core = require('../../lib');

// Either match your local database configuration according to the details below,
// or the other way round - change the details to match your local configuration.
var cn = {
    host: 'localhost',  // server name or IP address;
    port: 5432,         // default port;
    database: 'pg_core_test', // local database name for testing;
    user: 'postgres'    // user name;
    // password: - add password, if needed;
};

function Database() {
    var self = this;
    this.connect = function () {
        return new Promise(function (resolve, reject) {
            core.connect(cn, function (err, client, done) {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        client: client,
                        done: function () {
                            done();
                        }
                    });
                }
            });
        });
    };
    this.query = function (text, values) {
        var db;
        return self.connect()
            .then(function (ctx) {
                db = ctx;
                return new Promise(function (resolve, reject) {
                    try {
                        db.client.query(text, values, function (err, result) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        });
                    } catch (e) {
                        reject(e);
                    }
                });
            })
            .finally(function () {
                if (db) {
                    db.done();
                }
            });
    };
}

module.exports = {
    db: new Database(),
    promise: Promise,
    core: core
};
