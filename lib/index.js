const $npm = {
  dbMigrate: require('./dbMigrate'),
  debug: require('debug')('pg-migration:index'),
  promise: require('bluebird'),
  dbConnection: require('./dbConnection')
};

function $main(opts) {
  $npm.debug('run');

  if(!(opts.connection || process.env.DATABASE_URL)) {
    throw new Error('connection or connection string not provided');
  }
  if( !opts.migrations ) {
    throw new Error('Migrations not provided.');
  }

  //document available options and default them.
  var options = {
    connection: $npm.dbConnection(opts.connection || process.env.DATABASE_URL), //establish the connection
    migrations: opts.migrations
  };

  return $npm.dbMigrate(options.connection, options.migrations);
}

module.exports = $main;