var dbConnection = require('../lib/dbConnection');
module.exports = dbConnection('postgresql://localhost:5432/pg_migrate');