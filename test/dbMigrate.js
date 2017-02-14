var assert = require('chai').assert;
var dbConnection = require('../test-data/testConnection');
var dbMigrate = require('../lib/dbMigrate');
var basicMigrations = require('../test-data/simpleForwardMigrations');
var dbInfo = require('../lib/dbInfo');

describe('dbMigrate', function () {
  beforeEach(function() {
    return dbConnection
      .none('drop table if exists example;')
      .then(function() {
        return dbInfo(dbConnection);
      }).catch(function(er){
        console.log('afterEach:catch', er);
      });
  });

  afterEach(function() {
    return dbConnection
      .none('drop table if exists example;')
      .catch(function(er){
        console.log('afterEach:catch', er);
      });
  });

  it('basic migration', function() {
    var result = dbMigrate(dbConnection, basicMigrations);
    result.then(function(batchResult){
      assert.equal(batchResult.result, true);
    });
  });
});