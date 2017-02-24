/**
 * This module will create a connection to the database and return it.
 * It is an instance of pg-promise.
 * Once this is require'd once, the same object will be returned througout the app.
 */

module.exports = function(connectionStringOrObject, noLocking) {
  noLocking = noLocking || false; //see http://vitaly-t.github.io/pg-promise/module-pg-promise.html
  const $npm = {
    debug: require('debug')('db-migration:dbConnection'),
    pgp: require('pg-promise')({promiseLib: require('bluebird'), noLocking:noLocking}),
    url: require('url'),
    isObject: require('isobject')
  };

  if(!(typeof connectionStringOrObject == 'string' || $npm.isObject(connectionStringOrObject)))
    throw new Error('connectionStringOrObject must be string or object');

  var connectionObj = null;
  if($npm.isObject(connectionStringOrObject)) {
    $npm.debug('object');
    connectionObj = connectionStringOrObject;
  } else {
    $npm.debug('string');
    const params = $npm.url.parse(connectionStringOrObject);
    const auth = (params.auth || ":").split(':');

    connectionObj = {
      user: auth[0],
      password: auth[1],
      host: params.hostname || "localhost",
      port: params.port,
      database: params.pathname.split('/')[1],
      max: 20, //fine for now
      idleTimeoutMillis: 1000
      //ssl: true //Can this come from the connection string?
    };
  }

  const db = $npm.pgp(connectionObj);

  $npm.debug("Database Connection established");

  return db;
};