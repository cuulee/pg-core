////////////////////////////////////////////////
// Initialization scripts for the test database;
////////////////////////////////////////////////

'use strict';

var shared = require('./index');

var core = shared.core;
var Promise = shared.promise;
var db = shared.db;

(function () {

    var ctx, queries;

    db.connect()
        .then(function (obj) {
            ctx = obj;
            populate();
            return Promise.all(queries);
        })
        .then(function () {
            console.log("*** SUCCESS ***");
        })
        .catch(function (error) {
            console.log("ERROR:", error);
        })
        .finally(function () {
            if (ctx) {
                ctx.done();
                core.end();
            }
        });

    function query(text, values) {
        return new Promise(function (resolve, reject) {
            try {
                ctx.client.query(text, values, function (err, result) {
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
    }

    function populate() {
        queries = [
            // drop all the tables, if exist:
            query("drop table if exists users"),

            // create all the tables:
            query("create table users(id serial, login text, active boolean)"),

            // inserting data:
            query("insert into users(login, active) values($1,$2)", ['user-1', true]),
            query("insert into users(login, active) values($1,$2)", ['user-2', true]),
            query("insert into users(login, active) values($1,$2)", ['user-3', false]),
            query("insert into users(login, active) values($1,$2)", ['user-4', false])

        ];
    }

}());
