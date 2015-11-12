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

if (jasmine.Runner) {
    var _finishCallback = jasmine.Runner.prototype.finishCallback;
    jasmine.Runner.prototype.finishCallback = function () {
        // Run the old finishCallback:
        _finishCallback.bind(this)();

        core.end(); // closing pg database application pool;
    };
}
