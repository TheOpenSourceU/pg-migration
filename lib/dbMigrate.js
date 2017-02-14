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
        //$npm.debug('[then] ', output);
        return {result:true, output:output};
      }).catch(function(er){
        $npm.debug('[error-1] Error:', er);
        throw er;
      });
    });
  }

  //Now we need to replace the below. In short, we take the keys and order them...
  var versions = Object.keys( migrations );
  versions = versions.filter(function(v) { return v != 'latest'; });
  versions = versions.sort(function(a, b){
    var versionA = new $npm.Version(a);
    var versionB = new $npm.Version(b);
    var compareResult = versionA.compare(versionB);
    $npm.debug('[sort] compareResult', compareResult);
    return compareResult;
  });

  //Now, we need to set up a serial promise...
  var orderedVersions = versions.map(function(ver) {
    return migrations[ver];
  });

  return $npm.Promise.mapSeries(orderedVersions, function(item, index, length){
    return processVersion(item);
  }).then(function(out) {
    $npm.debug('[then] mapSeries is done', out);
    var result = {};
    out.forEach(function(val, idx) {
      result[ versions[idx] ] = val;
    });
    return result;
  }).catch(function(er){
    $npm.debug('[catch] error from mapSeries', er);
    throw er;
  });
};