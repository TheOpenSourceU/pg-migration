var $npm = {
  debug: require('debug')('db-migration:dbInfo')
};

const table = "CREATE TABLE pg_migration_dbinfo  \
(                                                \
  key VARCHAR(20) PRIMARY KEY,                   \
  value VARCHAR(50) NOT NULL                     \
);";
const tableNotFound = '42P01';

/**
 *
 * @param conn
 * @returns {promise} A promise with the result {version: {string}}
 */
module.exports = function(conn) {
  $npm.debug('starting');
  return conn
    .one("SELECT key, value FROM pg_migration_dbinfo WHERE key = 'db_version';")
    .then(function (queryResult) {
      $npm.debug('Received query results. Returing ', queryResult.value);
      return {version: queryResult.value};
    }).catch(function(er) {
      $npm.debug('caught error');
      if(er.code == tableNotFound || er.name == 'QueryResultError') {
        $npm.debug('Either the table was not found or it is empty. Creating...');
        //create the DB.
        return conn.none(table)
          .then( function(result) {
            $npm.debug('Created. Returning 0.0.0');
            return { version: '0.0.0' };
          });
      }
    });
};

