module.exports = function (dbConnection, migrations) {
  "use strict";

  const $npm = {
    debug: require('debug')('db-migration:dbMigrate'),
    Version: require('./dbVersion'),
    //dbInfo: require('./dbInfo'),
    dbConnection: dbConnection,
    Promise: require('bluebird')
  };

  function processVersion(version) {

    return $npm.dbConnection.tx(function(t){
      var batchList = [];

      //tables
      version.tables.map(function(tableSql) {
        batchList.push( t.none(tableSql) );
      });

      //inserts
      version.data.map(function(dataSql) {
        batchList.push( t.tx(function(t1) {return t1.oneOrNone(dataSql); } ));
      });

      //indexes
      version.indexes.map(function(indexSql){
        batchList.push( t.none(indexSql) );
      });

      return t.batch(batchList).then(function(output){
        $npm.debug('[then] ', output);
        return {result:true, output:output};
      }).catch(function(er){
        $npm.debug('[error-1] Error:', er);
        throw er;
      });
    });
  }

  return processVersion(migrations['1.0.0']).then(function (rObj){
    $npm.debug('[then] rObj=', rObj);
    if(!rObj.result) throw new Error("unexpected result in test harness");
    return processVersion(migrations['1.0.1']); //Example, just to start
  });

};