var shared = require('../db');

var core = shared.core;
var Promise = shared.promise;
var db = shared.db;

var copy = core.copy;

function dummy() {
}

describe("Copy", function () {

    describe("to stdout", function () {
        var success;
        beforeEach(function (done) {
            var ctx;
            db.connect()
                .then(function (obj) {
                    ctx = obj;
                    return ctx.client.query(copy.to('COPY numbers TO STDOUT'));
                })
                .then(function (stream) {
                    return new Promise(function (resolve, reject) {
                        stream.once('end', function () {
                            resolve();
                        });
                        stream.once('error', function (error) {
                            reject(error);
                        });
                        stream.once('data', function () {
                            // ignore the data;
                        });
                    });
                })
                .then(function () {
                    success = true;
                }, dummy)
                .finally(function () {
                    if (ctx) {
                        // TODO: test below breaks the connection pool, and thus all other tests;
                        // TODO: That's why we have to release the connection entirely;
                        ctx.client.end();
                    }
                    done();
                });
        });
        it("must end successfully", function () {
            expect(success).toBe(true);
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
