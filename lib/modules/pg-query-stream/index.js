'use strict';

var util = require('util');
var Cursor = require('../pg-cursor');
var Readable = require('readable-stream').Readable;

function QueryStream(text, values, options) {
    var self = this;
    this._reading = false;
    this._closing = false;
    options = options || {};
    Cursor.call(this, text, values);
    Readable.call(this, {
        objectMode: true,
        highWaterMark: options.highWaterMark || 1000
    });
    this.batchSize = options.batchSize || 100;
    this.once('end', function () {
        process.nextTick(function () {
            self.emit('close');
        });
    });
}

util.inherits(QueryStream, Readable);

// copy cursor prototype to QueryStream
// so we can handle all the events emitted by the connection
for (var key in Cursor.prototype) {
    if (key == 'read') {
        QueryStream.prototype._fetch = Cursor.prototype.read;
    } else {
        QueryStream.prototype[key] = Cursor.prototype[key];
    }
}

QueryStream.prototype.close = function (cb) {
    this._closing = true;
    var self = this;
    Cursor.prototype.close.call(this, function (err) {
        if (cb) {
            cb(err);
        }
        if (err) {
            return self.emit('error', err);
        }
        process.nextTick(function () {
            self.push(null);
        });
    });
};

QueryStream.prototype._read = function (/*n*/) {
    if (this._reading || this._closing) {
        return false;
    }
    this._reading = true;
    var self = this;
    this._fetch(this.batchSize, function (err, rows) {
        if (err) {
            return self.emit('error', err);
        }
        if (self._closing) {
            return;
        }
        if (!rows.length) {
            process.nextTick(function () {
                self.push(null);
            });
            return;
        }
        self._reading = false;
        for (var i = 0; i < rows.length; i++) {
            self.push(rows[i]);
        }
    });
};

module.exports = QueryStream;
