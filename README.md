# pg-core

PostgreSQL Core Driver for NodeJS.

[![Build Status](https://travis-ci.org/vitaly-t/pg-core.svg?branch=master)](https://travis-ci.org/vitaly-t/pg-core)
[![Coverage Status](https://coveralls.io/repos/vitaly-t/pg-core/badge.svg?branch=master)](https://coveralls.io/r/vitaly-t/pg-core?branch=master)

Initially based on [node-postgres] and its core packages, this core library for PostgreSQL is independent
of the original work. Its goal is improved and simplified support with timely updates and bug fixes.

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

Apart from these differences, the original [node-postgres] is a reliable source
of documentation that entirely covers functionality of this library.

### Testing

```
$ npm test
```

Testing with coverage:
```
$ npm run coverage
```
See also the [Test Matrix](/test).

### Origins

The original snapshots were taken on November 11, 2015, and included:

* [node-postgres v.4.4.3](https://github.com/brianc/node-postgres/tree/v4.4.3)
* [pg-query-stream v.0.7.0](https://github.com/brianc/node-pg-query-stream/tree/v0.7.0)
* [pg-cursor v.1.0.0](https://github.com/brianc/node-pg-cursor/tree/v1.0.0)
* [pg-types v.1.10.0](https://github.com/brianc/node-pg-types/tree/v1.10.0)

### What's Changed

The following has been changed from the original [node-postgres] library:

* Completely removed - `pg.native`, only javascript implementation is supported;
* The library has being refactored for ES6 compliance
* All dependencies are kept up-to-date, no use of obsolete packages;
* Supported environments: NodeJS 0.10 - 5.x, PostgreSQL 9.x, Win/Linux/OS-X
* New tests are being written in place of the old ones. YOUR HELP IS WELCOME!

### License

The original license note can be found [here](https://github.com/vitaly-t/pg-core/blob/master/license.md).

[node-postgres]:https://github.com/brianc/node-postgres
