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
    return result.then(function(batchResult){
      console.log('[unit test then] batchResult', batchResult);
      console.log('                 *** SUCESS **');
      assert.isTrue(batchResult.overallResult);
      assert.isTrue(batchResult["1.0.0"].result);
      assert.isTrue(batchResult["1.0.1"].result);
      assert.isTrue(batchResult["1.0.2"].result);
    });
  });
});