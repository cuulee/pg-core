# pg-core

PostgreSQL Core Driver.

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
