var assert = require('chai').assert;
var conn = require('../lib/dbConnection')("postgresql://localhost:5432/pg_migrate");
var dbInfo = require('../lib/dbInfo');

describe('dbInfo', function () {
  before(function() {

  });

  beforeEach(function() {

  });

  it('builds out table if missing', function () {
    return conn
      .none('drop table if exists pg_migration_dbinfo')
      .then(function(r) {
        console.log('dropped old table... running dbInfo', r);
        return dbInfo(conn);
      })
      .then(function (resultObj) {
        console.log('received results', resultObj);
        assert.isDefined(resultObj);
        assert.equal("0.0.0", resultObj.version);
      });
  });

});