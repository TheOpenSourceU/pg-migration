const $npm = {
  dbMigrate: require('./dbMigrate'),
  debug: require('debug')('pg-migration:index'),
  promise: require('bluebird'),
  dbConnection: require('./dbConnection')
};

/**
 * Entry point.
 * @param opts object with {connection: [see url], migrations: [see readme]
 * @returns {*} A promise which resolves when we're done.
 */
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

  return $npm
    .dbMigrate(options.connection, options.migrations)
    .then(function(r) {
      //Whether we should use this is debatable. I imagine the author of pg-promise would say not to.
      // The alternative is allow the pgp instance to be passed in and thus allow us to use the
      //  parent app's instance. This complicates the interface, however.
      options.connection.$config.pgp.end(); //https://github.com/vitaly-t/pg-promise/issues/261
      return r;
    });
}

module.exports = $main;