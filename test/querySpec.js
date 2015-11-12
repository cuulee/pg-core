var shared = require('./db');

var PGResult = require('../lib/result');

var core = shared.core;
var Promise = shared.promise;
var db = shared.db;

describe("Formatted Queries", function(){

    describe("basic request", function () {
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
