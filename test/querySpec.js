var shared = require('./db');

var PGResult = require('../lib/result');

var core = shared.core;
var Promise = shared.promise;
var db = shared.db;

describe("Formatted Queries", function () {

    describe("basic request", function () {
        var result;
        beforeEach(function (done) {
            db.query("select * from numbers")
                .then(function (data) {
                    result = data;
                })
                .finally(function () {
                    done();
                });
        });
        it("must return records", function () {
            expect(result instanceof PGResult).toBe(true);
            expect(result.rows && result.rows.length).toBeTruthy();
        });
    });

    describe("insert with mixed values", function () {
        var result;
        beforeEach(function (done) {
            var obj = {
                toPostgres: function () {
                    return 123;
                }
            };
            db.query("insert into mix(num, bin, txt, bool, _bit, _ts) values($1, $2, $3, $4, $5, $6)",
                [obj, '\x1A2B', 'hello', true, 1, new Date()])
                .then(function (data) {
                    result = data;
                })
                .finally(function () {
                    done();
                });
        });
        it("must insert the record", function () {
            //expect(result instanceof PGResult).toBe(true);
            //expect(result.rows && result.rows.length).toBeTruthy();
        });
    });

    describe("insert with arrays", function () {
        // TODO: bug - passing null within array of binaries breaks the reader;
        var result;
        beforeEach(function (done) {
            var obj = {
                text: 'world'
            };
            db.query("insert into mix_arrays(num, bin, txt, bool, _bit, _ts) values($1, $2, $3, $4, $5, $6)",
                [[123, 0, null], ['\x1A2B', '\x1C2D'], ['hello', obj, null], [true, false], [0, 1], [new Date(), null]])
                .then(function (data) {
                    result = data;
                })
                .finally(function () {
                    done();
                });
        });
        it("must insert the record", function () {
            //expect(result instanceof PGResult).toBe(true);
            //expect(result.rows && result.rows.length).toBeTruthy();
        });
    });

});

if (jasmine.Runner) {
    var _finishCallback = jasmine.Runner.prototype.finishCallback;
    jasmine.Runner.prototype.finishCallback = function () {
        // Run the old finishCallback:
        _finishCallback.bind(this)();

        core.end(); // closing pg database application pool;
    };
}
