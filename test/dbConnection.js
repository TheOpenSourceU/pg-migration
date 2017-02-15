var assert = require('chai').assert;
var expect = require('chai').expect;
var connStr = require('../test-data/localConnectionString');
var dbConnection = require('../lib/dbConnection');
var url = require('url');

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
    var conn = dbConnection(connStr);
    return conn.one('SELECT version();')
      .then(function(r) {
        assert.isNotNull(r);
        assert.isNotNull(r.version);
      })
      .error(function(er){
        assert.fail(er);
        throw er;
      });
  });

  it('Constructs with object', function () {

    var params = url.parse(connStr);
    var auth = (params.auth || ":").split(':');

    var conObj = {
      user: auth[0],
      password: auth[1],
      host: params.hostname || "localhost",
      port: params.port,
      database: params.pathname.split('/')[1],
      max: 1,
      idleTimeoutMillis: 1000
    };

    assert.isDefined(conObj.user);
    assert.isDefined(conObj.password);
    assert.isDefined(conObj.host);
    assert.isDefined(conObj.port);
    assert.isDefined(conObj.database);

    var conn = dbConnection(conObj);
    return conn.one('SELECT version();')
      .then(function(r) {
        assert.isNotNull(r);
        assert.isNotNull(r.version);
      })
      .error(function(er){
        assert.fail(er);
        throw er;
      });
  });
});