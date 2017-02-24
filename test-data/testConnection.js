var dbConnection = require('../lib/dbConnection');
var connStr = require('../test-data/localConnectionString');
var noLocking = true; //can't redefine the properties on dbConnection without this -- http://stackoverflow.com/a/38268936/18196
module.exports = dbConnection(connStr, noLocking);