const assert = require('chai').assert;
const pg_migration = require('../lib/index');
const sinon = require('sinon');
const _ = require('lodash');
var connStr = require('../test-data/localConnectionString');

describe('index', function () {
  var _saveEnv = null;
  beforeEach(function() {
    _saveEnv = _.cloneDeep(process.env);
  });
  afterEach(function() {
    process.env = _saveEnv;
    _saveEnv = null;
  });

  it('no arguments throws exception', function () {
    assert.throws(pg_migration);
  });

  it('missing migration argument', function() {
    const opt = {
      connection: 'fake connection string'
    };
    const f = function() { pg_migration(opt); };
    assert.throws(f);
  });

  it('missing connection argument', function() {
    delete process.env.DATABASE_URL;
    const opt = {
      migrations: {}
    };
    const f = function() { pg_migration(opt); };
    assert.throws(f);
  });

  it('calls dbMigrate with options; returns a promise', function() {
    const opt = {
      connection: 'fake connection string',
      migrations: {}
    };
    const resultPromise = pg_migration(opt);

    return resultPromise.then(function(r) {
      assert.isTrue(r.overallResult);
    });
  });

  it('handle pre-created pgp connection object', function() {
    const opt = {
      connection: require('pg-promise')({noLocking:true})(connStr),
      migrations: {}
    };
    const resultPromise = pg_migration(opt);
    return resultPromise.then(function(r) {
      assert.isTrue(r.overallResult);
    });
  });
});