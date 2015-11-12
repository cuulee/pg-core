var shared = require('./db');

var PGClient = require('../lib/client');
var PGResult = require('../lib/result');

var core = shared.core;
var Promise = shared.promise;
var db = shared.db;

describe("initial test", function () {
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
        expect(rows && rows.length === 1).toBe(true);
        expect(rows[0]).toEqual({
            _smallint: 1,
            _integer: 2,
            _bigint: '3',
            _decimal: '4.123',
            _numeric: '5.456',
            _real: 6.07,
            _dp: 7.89,
            _serial: 1,
            _bigserial: '1'
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
