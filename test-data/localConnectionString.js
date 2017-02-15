/**
 * Exports the connection string. Can use via require('localConnectionString').
 * Intended only for development.
 * See https://help.ubuntu.com/community/PostgreSQL#Alternative_Server_Setup to configure a localhost user that should work with this.
 *  //Example: module.exports = 'postgresql://localhost:5432/pg_migration';
 * @type {string} the connection string on localhost
 */

// We'll use the later as a bad assumption
module.exports = process.env.DATABASE_URL || 'postgresql://localhost:5432/pg_migration';