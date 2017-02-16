var assert = require('chai').assert;
var pg_migration = require('../lib/index');
var sinon = require('sinon');
var _ = require('lodash');

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

  it('missinge migration argument', function() {
    var opt = {
      connection: 'fake connection string'
    };
    var f = function() { pg_migration(opt); };
    assert.throws(f);
  });

  it('missing connection argument', function() {
    delete process.env.DATABASE_URL;
    var opt = {
      migrations: {}
    };
    var f = function() { pg_migration(opt); };
    assert.throws(f);
  });

  it('calls dbMigrate with options; returns a promise', function() {
    var opt = {
      connection: 'fake connection string',
      migrations: {}
    };
    var resultPromise = pg_migration(opt);

    return resultPromise.then(function(r) {
      assert.isTrue(r.overallResult);
    });
  });

});