# pg-migration
A nodejs package to help with database migrations -- that is, changes to your
database over time.

## Status
This project is close to being ready for consuming. Being that I need it for
something else, I expect it'll be ready in a couple of days.  

## Examples
Examples are fourth coming. At this point in time, the best examples are
contained within the unit tests.

## Contributions
Status aside, of course contributions are welcomed but please know that
I'm transposing a group of modules I wrote for another project. I'm
restructuring it as an open source library as opposed to an in-app
component.

I am open to simple architectural suggestions as [Node.js](https://nodejs.org/en/)/JavaScript isn't
my "main" programming language. That said, I'm trying to take queues from
Nightwatch and pg-promise and am -- at a high level -- following those
ideas amongst my own.

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
100%; Run those with the following:

```npm test```

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
