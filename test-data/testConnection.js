var dbConnection = require('../lib/dbConnection');
var connStr = require('../test-data/localConnectionString');
module.exports = dbConnection(connStr);