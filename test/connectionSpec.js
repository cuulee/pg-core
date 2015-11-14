var shared = require('./db');

var PGClient = require('../lib/client');

var core = shared.core;
var Promise = shared.promise;
var db = shared.db;

describe("Connection", function () {

    describe("default", function () {
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

    describe("string connection parameters", function () {
        var result;
        beforeEach(function (done) {
            db.connect()
                .then(function (ctx) {
                    ctx.client.connectionParameters.getLibpqConnectionString(function (err, data) {
                        result = data;
                        done();
                    });
                    ctx.done();
                })
                .catch(function () {
                    done();
                });
        });
        it("must be parsed properly", function () {
            expect(typeof result).toBe('string');
            expect(result.indexOf('user') >= 0).toBe(true);
            expect(result.indexOf('host') >= 0).toBe(true);
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
