'use strict';

var Promise = require('bluebird');
var core = require('../../lib');

function Database(cn) {
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
    db: new Database("postgres://postgres@localhost/pg_core_test"),
    promise: Promise,
    core: core
};
