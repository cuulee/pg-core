var shared = require('../db');
var PGResult = require('../../lib/result');

var core = shared.core;
var Promise = shared.promise;
var db = shared.db;

var Cursor = core.cursor;

function dummy() {
}

describe("Cursor", function () {

    describe("with valid query", function () {
        var rows;
        beforeEach(function (done) {
            var ctx;
            db.connect()
                .then(function (obj) {
                    ctx = obj;
                    return ctx.client.query(new Cursor("select * from numbers"));
                })
                .then(function (cursor) {
                    return new Promise(function (resolve, reject) {
                        cursor.read(100, function (err, data) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(data);
                            }
                        });
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
