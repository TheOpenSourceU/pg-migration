var assert = require('chai').assert;
var expect = require('chai').expect;
var dbConnection = require('../lib/dbConnection');

describe('dbConnection', function () {
  it('handles no input', function() {
    expect(dbConnection).to.throw(Error);
  });

  //This works though I think it's logic in pg-promise or pg.
  // it('handles empty object', function() {
  //   //expect(() => dbConnection({})).to.throw(Error);
  //   var conn = dbConnection({});
  //   conn.one('SELECT version();')
  //     .then(function(r) {
  //       assert.isNotNull(r);
  //       assert.isNotNull(r.version);
  //     })
  //     .error(function(er){
  //       assert.fail(er);
  //     });
  // });

  it('Constructs with string', function () {
    var conn = dbConnection("postgresql://localhost:5432/pg_migrate");
    conn.one('SELECT version();')
      .then(function(r) {
        assert.isNotNull(r);
        assert.isNotNull(r.version);
      })
      .error(function(er){
        assert.fail(er);
      });
  });

  it('Constructs with object', function () {
    var conObj = {
      user: '',
      password: '',
      host: "localhost",
      port: 5432,
      database: 'pg_migrate',
      max: 2,
      disconnect: function(client, dc) {
        console.log('disconnect');
      }
    };
    var conn = dbConnection(conObj);
    conn.one('SELECT version();')
      .then(function(r) {
        assert.isNotNull(r);
        assert.isNotNull(r.version);
      })
      .error(function(er){
        assert.fail(er);
      });
  });
});