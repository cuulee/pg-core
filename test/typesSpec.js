var shared = require('./db');

var core = shared.core;
var Promise = shared.promise;
var db = shared.db;

describe("Data Types", function () {
    describe("numbers", function () {
        var rows;
        beforeEach(function (done) {
            db.query("select * from numbers")
                .then(function (data) {
                    rows = data.rows;
                })
                .finally(function () {
                    done();
                });
        });
        it("must be parsed correctly", function () {
            expect(rows).toEqual([{
                _smallint: 1,
                _integer: 2,
                _bigint: '3', // TODO: Why not just an integer?
                _decimal: '4.123', // TODO: why different from an array of type? That's a bug!
                _numeric: '5.456', // TODO: why different from an array of type? That's a bug!
                _real: 6.07,
                _dp: 7.89,
                _serial: 1,
                _bigserial: '1' // TODO: Why not just an integer?
            }, {
                _smallint: null,
                _integer: null,
                _bigint: null,
                _decimal: null,
                _numeric: null,
                _real: null,
                _dp: null,
                _serial: 2,
                _bigserial: '2'
            }]);
        });
    });

    describe("number arrays", function () {
        var rows;
        beforeEach(function (done) {
            db.query("select * from number_arrays")
                .then(function (data) {
                    rows = data.rows;
                })
                .finally(function () {
                    done();
                });
        });
        it("must be parsed correctly", function () {
            expect(rows).toEqual([{
                _smallint: [1],
                _integer: [2],
                _bigint: ['3'], // TODO: Why not just an integer?
                _decimal: [4.123], // TODO: why different from a single type? That's a bug!
                _numeric: [5.456], // TODO: why different from a single type? That's a bug!
                _real: [6.07],
                _dp: [7.89]
            }, {
                _smallint: null,
                _integer: null,
                _bigint: null,
                _decimal: null,
                _numeric: null,
                _real: null,
                _dp: null
            }]);
        });
    });

    describe("times", function () {
        var rows;
        beforeEach(function (done) {
            db.query("select * from times")
                .then(function (data) {
                    rows = data.rows;
                })
                .finally(function () {
                    done();
                });
        });
        it("must be parsed correctly", function () {
            expect(rows && rows.length === 1);
            // TODO: need more tests here...
        });
    });

    describe("time arrays", function () {
        var rows;
        beforeEach(function (done) {
            db.query("select * from time_arrays")
                .then(function (data) {
                    rows = data.rows;
                })
                .finally(function () {
                    done();
                });
        });
        it("must be parsed correctly", function () {
            expect(rows && rows.length === 1);
            // TODO: need more tests here...
        });
    });

    describe("mix", function () {
        var rows;
        beforeEach(function (done) {
            db.query("select * from mix")
                .then(function (data) {
                    rows = data.rows;
                })
                .finally(function () {
                    done();
                });
        });
        it("must be parsed correctly", function () {
            expect(rows && rows.length === 1);
            // TODO: need more tests here...
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
