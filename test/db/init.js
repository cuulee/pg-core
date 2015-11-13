////////////////////////////////////////////////
// Initialization scripts for the test database;
////////////////////////////////////////////////

'use strict';

var shared = require('./');

var core = shared.core;
var Promise = shared.promise;
var db = shared.db;

(function () {

    var ctx, queries;

    function populate() {
        var dt = new Date();

        queries = [

            // numbers:
            query("drop table if exists numbers"),
            query("create table numbers(_smallint smallint null, _integer integer null, _bigint bigint null, _decimal decimal null, _numeric numeric null, _real real null, _dp double precision null, _serial serial, _bigserial bigserial)"),
            query("insert into numbers(_smallint, _integer, _bigint, _decimal, _numeric, _real, _dp) values($1,$2,$3,$4,$5,$6,$7)", [1, 2, 3, 4.123, 5.456, 6.07, 7.89]),
            query("insert into numbers(_smallint) values($1)", [null]),

            // number_arrays:
            query("drop table if exists number_arrays"),
            query("create table number_arrays(_smallint smallint[] null, _integer integer[] null, _bigint bigint[] null, _decimal decimal[] null, _numeric numeric[] null, _real real[] null, _dp double precision[] null)"),
            query("insert into number_arrays(_smallint, _integer, _bigint, _decimal, _numeric, _real, _dp) values($1,$2,$3,$4,$5,$6,$7)", [[1], [2], [3], [4.123], [5.456], [6.07], [7.89]]),
            query("insert into number_arrays(_smallint) values($1)", [null]),

            // times:
            query("drop table if exists times"),
            query("create table times(_date date null, _time time null, _timestamp timestamp null, _timestamptz timestamptz null)"),
            query("insert into times(_date, _time, _timestamp, _timestamptz) values($1,current_time,$2,$3)", [dt, dt, dt]),
            query("insert into times(_date) values($1)", [null]),

            // times_arrays:
            query("drop table if exists time_arrays"),
            query("create table time_arrays(_date date[] null, _time time[] null, _timestamp timestamp[] null, _timestamptz timestamptz[] null)"),
            query("insert into time_arrays(_date, _time, _timestamp, _timestamptz) values($1,array[current_time],$2,$3)", [[dt], [dt], [dt]]),
            query("insert into time_arrays(_date) values($1)", [null]),

            // mix:
            query("drop table if exists mix"),
            query("create table mix(num integer null, bin bytea null, txt text null, bool boolean null, _bit bit null, _ts timestamptz null)"),
            query("insert into mix(num, bin, txt, bool, _bit, _ts) values($1, $2, $3, $4, $5, $6)", [123, '\x1A2B', 'hello', true, 1, dt]),

            // mix_arrays:
            query("drop table if exists mix_arrays"),
            query("create table mix_arrays(num integer[] null, bin bytea[] null, txt text[] null, bool boolean[] null, _bit bit[] null, _ts timestamptz[] null)"),
            query("insert into mix_arrays(num, bin, txt, bool, _bit, _ts) values($1, $2, $3, $4, $5, $6)", [[123], ['\x1A2B'], ['hello'], [true], [1], [dt]])

        ];
    }

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

}());
