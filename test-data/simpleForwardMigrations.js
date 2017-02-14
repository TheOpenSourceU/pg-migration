// this is an example
const tables = {
  latest: '1.0.1',

  //Any new version would change the DB...
  '1.0.0': {
    tables: ["CREATE TABLE example(key VARCHAR(200) PRIMARY KEY NOT NULL, value VARCHAR(500) NOT NULL)",],
    data: ["INSERT INTO example(key, value) VALUES ('test', 'yes')"],
    indexes: ['CREATE INDEX example_value_index ON example (value);']
  },
  '1.0.1': {
    tables: ['ALTER TABLE example ADD "desc" VARCHAR(200) NULL;'], //maybe alter table.
    data: ["INSERT INTO example(key, value) VALUES ('test2', 'yes2')"],
    indexes: ["DROP INDEX example_value_index CASCADE;"]
  }
};

module.exports = tables;
