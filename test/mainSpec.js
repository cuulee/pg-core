var shared = require('./db');

var PGClient = require('../lib/client');
var PGResult = require('../lib/result');

var core = shared.core;
var Promise = shared.promise;
var db = shared.db;

describe("can connect", function () {
    var result;
    beforeEach(function (done) {
        db.connect()
            .then(function (db) {
                result = db;
                db.done();
            })
            .finally(function () {
                done();
            });
    });
    it("must connect and pass correct context", function () {
        expect(result && typeof result === 'object').toBeTruthy();
        expect(result.client instanceof PGClient).toBe(true);
        expect(result.done instanceof Function).toBe(true);
    });
});

describe("execute a basic request", function () {
    var result;
    beforeEach(function (done) {
        db.query("select * from users")
            .then(function (data) {
                result = data;
            })
            .finally(function () {
                done();
            });
    });
    it("must return user records", function () {
        expect(result instanceof PGResult).toBe(true);
        expect(result.rows && result.rows.length).toBeTruthy();
    });
});


describe("simple numbers", function () {
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

if (jasmine.Runner) {
    var _finishCallback = jasmine.Runner.prototype.finishCallback;
    jasmine.Runner.prototype.finishCallback = function () {
        // Run the old finishCallback:
        _finishCallback.bind(this)();

        core.end(); // closing pg database application pool;
    };
}
