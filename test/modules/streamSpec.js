var shared = require('../db');

var core = shared.core;
var Promise = shared.promise;
var db = shared.db;

var QueryStream = core.stream;

function dummy() {
}

describe("Stream", function () {

    describe("with valid query", function () {
        var rows = [];
        beforeEach(function (done) {
            var ctx;
            db.connect()
                .then(function (obj) {
                    ctx = obj;
                    return ctx.client.query(new QueryStream("select * from numbers"));
                })
                .then(function (stream) {
                    return new Promise(function (resolve, reject) {
                        var result = [];
                        stream.on('data', process);
                        stream.once('end', function () {
                            stream.removeListener('data', process);
                            resolve(result);
                        });
                        stream.once('error', function (err) {
                            reject(err);
                        });
                        function process(data) {
                            result.push(data);
                        }
                    });
                })
                .then(function (data) {
                    rows = data;
                }, dummy)
                .finally(function () {
                    if (ctx) {
                        ctx.done();
                    }
                    done();
                });
        });
        it("must be parsed correctly", function () {
            expect(rows && rows.length === 2).toBe(true);
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
