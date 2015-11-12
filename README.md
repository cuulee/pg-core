# pg-core

PostgreSQL Core Driver for NodeJS.

[![Build Status](https://travis-ci.org/vitaly-t/pg-core.svg?branch=master)](https://travis-ci.org/vitaly-t/pg-core)

Initially based on [node-postgres](https://github.com/brianc/node-postgres) and its core packages,
this core library for PostgreSQL is independent of the original work. Its goal is improved and simplified support
with timely updates and bug fixes.

### Installing

```
$ npm install pg-core
```

### Using

```javascript
var pg = require('pg-core');
```

The library exposes the same object as the original `pg`, with the addition of:

* `pg.stream` - instance of the embedded `pg-query-stream` library;
* `pg.cursor` - instance of the embedded `pg-cursor` library;

and with the exception of:
* `pg.native` - native `libpq` bindings have been fully removed.

### Testing

```
$ npm test
```

Testing with coverage:
```
$ npm run coverage
```

### Origins

The original snapshots were taken on November 11, 2015, and included:

* [node-postgres v.4.4.3](https://github.com/brianc/node-postgres/tree/v4.4.3)
* [pg-query-stream v.0.7.0](https://github.com/brianc/node-pg-query-stream/tree/v0.7.0)
* [pg-cursor v.1.0.0](https://github.com/brianc/node-pg-cursor/tree/v1.0.0)
* [pg-types v.1.10.0](https://github.com/brianc/node-pg-types/tree/v1.10.0)

### Differences

This library has the following differences from the original package:

* Completely removed - `pg.native`, only javascript implementation is supported;
* Supported environments: NodeJS 0.10 - 5.x, PostgreSQL 9.x, Win/Linux/OS-X
* The library is being refactored for ES6 compliance
* All dependencies are kept up-to-date, no use of obsolete packages;
* All tests were removed initially (see further notes)

It is important to know that while this assembly didn't keep any of the original
tests, most of them are covered by the tests provided within [pg-promise 3.0](https://github.com/vitaly-t/pg-promise/releases/tag/v.3.0.0),
which is initially used for testing `pg-core`. This is however only the initial approach,
and new tests will be written and added to this library to assure complete code coverage.
YOUR HELP IN THIS IS VERY WELCOME! ;)

### License

The original license note can be found [here](https://github.com/vitaly-t/pg-core/blob/master/license.md).
