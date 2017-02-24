var assert = require('chai').assert;
var dbConnection = require('../test-data/testConnection');
var dbMigrate = require('../lib/dbMigrate');
var basicMigrations = require('../test-data/simpleForwardMigrations');
var dbInfo = require('../lib/dbInfo');
var _ = require('lodash');

var $npm = {
  debug: require('debug')('db-migration:test:dbMigrate'),
  sinon: require('sinon')
};

describe('dbMigrate', function () {

  beforeEach(function() {
    $npm.sinon.spy(dbConnection, 'tx');
    assert.equal(dbConnection.tx.callCount, 0);

    return dbConnection
      .none('drop table if exists example;')
      .then(function() {
        return dbConnection.none("UPDATE pg_migration_dbinfo set value = '0.0.0' WHERE key = 'db_version';");
      })
      .then(function() {
        console.log('beforeEach :: dropped example');
        return dbInfo(dbConnection);
      }).catch(function(er){
        console.log('afterEach:catch', er);
      });
  });

  afterEach(function() {
    return dbConnection
      .none('drop table if exists example;')
      .then(function() {
        return dbConnection.none("UPDATE pg_migration_dbinfo set value = '0.0.0' WHERE key = 'db_version';");
      })
      .then(function() {
        console.log('afterEach :: dropped example');
      })
      .catch(function(er){
        console.log('afterEach:catch', er);
      });
  });

  it('basic migration', function() {
    var result = dbMigrate(dbConnection, basicMigrations);
    return result.then(function(batchResult){
      console.log('[unit test then] batchResult', batchResult);
      console.log('                 *** SUCESS **');
      assert.isTrue(batchResult.overallResult);
      assert.isTrue(batchResult["1.0.0"].result);
      assert.isTrue(batchResult["1.0.1"].result);
      assert.isTrue(batchResult["1.0.2"].result);
    });
  });

  it('track deployed DB version in DB', function() {
    var result = dbMigrate(dbConnection, basicMigrations); //3 versions.
    return result.then(function(batchResult) {
      return dbConnection
        .one("SELECT value from pg_migration_dbinfo where key = 'db_version';")
        .then(function(result) {
          assert.equal(result.value, '1.0.2');
        });
    });
  });

  it('Performs incremental DB deployments', function() {
    var result = dbMigrate(dbConnection, basicMigrations); //to 1.0.2
    return result
      .then(function(batchResult) {
        assert.isTrue(batchResult.overallResult);
        return batchResult;
      })
      .then(function(batchResult) {

        assert.equal(3, dbConnection.tx.callCount);
        dbConnection.tx.reset(); //reset the spy.

        var clonedMigrations = _.cloneDeep(basicMigrations);
        clonedMigrations['1.0.3'] = {
          tables: ["CREATE TABLE secondtable( id SERIAL PRIMARY KEY NOT NULL, name VARCHAR(500), something1 INTEGER, something2 NUMERIC );"],
          data: [],
          indexes: ["CREATE UNIQUE INDEX secondTable_something1_uindex ON secondtable (something1);"]
        };

        var result2 = dbMigrate(dbConnection, clonedMigrations);
        return result2
          .then(function(result) {
            assert.isTrue(result.overallResult);

            assert.equal(1, dbConnection.tx.callCount);
            dbConnection.tx.reset(); //reset the spy.

            return result;
          })
          .then(function(results) {
            return dbConnection
              .one("SELECT value from pg_migration_dbinfo where key = 'db_version';")
              .then(function(result) {
                assert.equal(result.value, '1.0.3');
              });
          })
      });
  });
});