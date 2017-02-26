# pg-migration
A [Node.js](https://nodejs.org/en/) package to help with database migrations -- that is, changes to your
database over time.

The high level idea is to bring your projects' database up to the latest version
in an automatic, consistent manor across many environments (development, 
staging and **production**).

## Status
This project is ready for consumption. For now, you can include it in your project
via npm's git integration. More information here: https://docs.npmjs.com/files/package.json#github-urls

I'll be deploying a npm package once I feel no further refinements are needed.

## Examples
A basic example is provided below. This product is intended to aid keeping several 
developers database instances up to date no matter which version is pulled from 
source control. Do note, however, that this product doesn't 
support going backwards -- only forwards.

### Migration Object
The migration object is a JSON element that contains your SQL to create and modify the 
definition of the database.  Basic structure is this: 

```json
{
  "1.0.0": {
    "tables": ["CREATE TABLE ..."],
    "data": ["INSERT ..."],
    "indexes": []
  },
  "1.0.1": {
    "tables": ["DROP TABLE ..."],
    "data": ["UPDATE"],
    "indexes": []
  }
}
```

With node, you can define a `.json` file and `require` it to a variable or directly 
in the object's construction.

### App Initialization
After the migration object is setup, preferably in a different module, you execute 
code such as the following in a bootstrap or start up module.  Where, exactly, is up 
to you as long as it's prior to database access by your application.

pg-migration returns a [promise](http://bluebirdjs.com/docs/api-reference.html) so you can perform steps after with `then` or handle
errors which can result from bad SQL or, lets face it, a package bug.

```javascript
const pg_migration = require('pg-migration');
const d = pg_migration({
  connection: 'postgres://john:123@localhost:5432/products', //or an object 
  migrations: require('migrations.json')
});
d.catch(function(er) {
  console.log('pg-migration: Error occurred during pg-migration', er);
});
```

## Contributions
All contributions are welcomed. First time contributes are especially 
encouraged as this is a new, relatively simple project with straight 
forward requirements. If you want to break into Node JS, this is a good
project.

I am open to suggestions as well; Node is not my "day time forte" but 
has quickly become a technology of interest. That said, I'm trying to 
take queues from [Nightwatch](https://github.com/nightwatchjs/nightwatch) 
and [pg-promise](https://github.com/vitaly-t/pg-promise) and am -- at a 
high level -- following those ideas amongst my own.

### Setup
The following is instructions to set up this project on your workstations
for hacking/exploration or for contributions. The intention is to get the
dependencies installed so that you can run the unit tests. **Unit tests are good**

#### Dependencies

There are few dependencies that you must manually install.
[Node.js](https://nodejs.org/en/) and [postgres](https://www.postgresql.org/).

Please install these via your method of choice.
- Node
  - Windows: Use installer from the web site
  - Mac OS X: Use the installer or the Linux method
  - Linux: I'd suggest using [nvm](https://github.com/creationix/nvm#install-script)
- Postgres
  - Windows: ??
  - Mac OS X: [Postgres.app](https://postgresapp.com/)
  - Linux: ??

#### Get the source

First, clone the project with your tool of choice. I can't cover all tools
so I'll provide instructions with the git cli.

```
cd ~/github #or where you keep you github/git repos
git clone https://github.com/FrankV01/pg-migration.git
cd pg-migration
npm install
```

Assuming the above commands all execute successfully, the following should pass
100%; Run the following:

```npm
npm test
```

And you should get results similar to the following. The these results were
trimmed:

```
[...]
index
    ✓ no arguments throws exception
    ✓ missing migration argument
    ✓ missing connection argument
    ✓ calls dbMigrate with options; returns a promise


  17 passing (2s)
  ```

## Wiki 
Please see the wiki for more information: https://github.com/FrankV01/pg-migration/wiki