# Testing `pg-core`

Below are the steps for testing `pg-core` on your local machine.

## Initializing

* Install all `DEV` dependencies from the library's root folder:
```js
$ npm install
```
* Create empty database `pg_core_test`
* Make sure all tests can connect to your local test database, using the connection details in [test/db/index.js](/test/db/index.js).
  Either set up your test database accordingly or change the connection details in that file. 
* Initialize the database with [some test data](/test/db/init.js):
```js
$ node test/db/init.js
``` 
It should end up saying `*** SUCCESS ***`, if it was successful, or else log error details.

## Testing 

#### Running all tests:
```
$ npm test
```

#### Testing with coverage:
```
$ npm run coverage
```
This generates coverage report: `/coverage/lcov-report/index.html`.

## Notes
 
Please note that the steps provided above rely on the versions of NodeJS and PostgreSQL
already installed on your machine, expecting they are from the list of supported versions. 

When deployed to Travis CI however, the versions of NodeJS and PostgreSQL are used
according to the settings in file [.travis.yml](/.travis.yml). Those are the only versions
supported by this library, and they are currently set as follows:
 
NodeJS  | PostgreSQL
:--------: | :----------:
0.10 | 9.1
0.12 | 9.2
4.x  | 9.3
5.x  | 9.4
 