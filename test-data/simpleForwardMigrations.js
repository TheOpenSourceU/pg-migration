// this is an example
const tables = {
  //Any new version would change the DB...
  '1.0.0': {
    tables: ["CREATE TABLE example(key VARCHAR(200) PRIMARY KEY NOT NULL, value VARCHAR(500) NOT NULL)"],
    data: ["INSERT INTO example(key, value) VALUES ('test', 'yes')"],
    indexes: ['CREATE INDEX example_value_index ON example (value);']
  },
  '1.0.1': {
    tables: ['ALTER TABLE example ADD "desc" VARCHAR(200) NULL;'], //maybe alter table.
    data: ["INSERT INTO example(key, value) VALUES ('test2', 'yes2')"],
    indexes: ["DROP INDEX example_value_index CASCADE;"]
  },
  '1.0.2': {
    tables: [],
    data: (function() {
      var ar = [];
      for(var i = 0; i < 1000; i++) {
        ar.push( "INSERT INTO example(key, value) VALUES ('m-{0}', 'payload-{0}') RETURNING key".replace(/\{0\}/g, i) );
      }
      return ar;
    })(),
    indexes: []
  }
};

module.exports = tables;
