# pg-core

PostgreSQL Core Driver.

[![Build Status](https://travis-ci.org/vitaly-t/pg-core.svg?branch=master)](https://travis-ci.org/vitaly-t/pg-core)
[![Coverage Status](https://coveralls.io/repos/vitaly-t/pg-core/badge.svg?branch=master)](https://coveralls.io/r/vitaly-t/pg-core?branch=master)

Based on work by [Brian Carlson](https://github.com/brianc), it is an integration
assembly of [node-postgres](https://github.com/brianc/node-postgres) with its core packages
that is self-sufficient and independent of the original work. 

The project's goal is improved support with timely updates and bug fixes.

### installing

```
$ npm install pg-core
```

### using

```javascript
var pg = require('pg-core');
```

The library exposes the same object as the original `pg`, with the addition of:
* `pg.stream` - instance of the embedded `pg-query-stream` library;
* `pg.cursor` - instance of the embedded `pg-cursor` library;

### origins

The original snapshot was taken on November 11, 2015, and included:

* [node-postgres v4.4.3](https://github.com/brianc/node-postgres/tree/v4.4.3)
* [pg-query-stream v.0.7.0](https://github.com/brianc/node-pg-query-stream/tree/v0.7.0)
* [pg-cursor v1.0.0](https://github.com/brianc/node-pg-cursor/tree/v1.0.0)
* [pg-types v1.10.0](https://github.com/brianc/node-pg-types/tree/v1.10.0)

### differences

This library has the following differences from the original package:

* Completely removed - `pg.native`, only javascript implementation is supported;
* All dependencies are kept up-to-date, no use of obsolete packages;
* All tests were removed initially (see further notes)

It is important to know that while this assembly didn't keep any of the original
tests scripts, most of them are covered by the tests provided within [pg-promise](https://github.com/vitaly-t/pg-promise),
which is initially used for testing `pg-core`. This is however only the initial approach,
and new tests will be written and added to this library to assure complete code coverage.
