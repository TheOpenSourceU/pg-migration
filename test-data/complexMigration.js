// this is an example
const tables = {
  //Any new version would change the DB...
  '1.0.0': {
    tables: ['CREATE TABLE public.complex_example(id SERIAL PRIMARY KEY NOT NULL, name VARCHAR(200), created TIMESTAMP WITH TIME ZONE DEFAULT now(), typeId SMALLINT, description TEXT );'],
    data: [
      'INSERT INTO public.complex_example (name, typeid, description) VALUES ("tester-1", 1, "a good test row");',
      'INSERT INTO public.complex_example (name, typeid, description) VALUES ("test-02", 99, "derp");'
    ],
    indexes: ['']
  },
  '1.0.1': {
    tables: [],
    data: [
      'INSERT INTO public.complex_example (name, typeid, description) VALUES ("378582", 529, "6d3f8309-05fd-47b5-8103-8d2f1eb52e75");',
      'INSERT INTO public.complex_example (name, typeid, description) VALUES ("58a3a250", 159, "fe5816b5-2a27-4c2d-a6e7-35394ddeea7e");'
    ],
    indexes: ['CREATE INDEX complex_example_typeid_index ON public.complex_example (typeid);']
  },
  '1.1.0': {
    tables: [''],
    data: function() {
      var ar = [];
      for(var i = 0; i < 50; i++) {
        ar.push( 'INSERT INTO public.complex_example (name, typeid, description) VALUES ("name {0}", {0}, "generated row {0}") returning id, name'.replace(/\{0\}/g, i) );
      }
      return ar;
    },
    indexes: ['']
  },
  '2.0.0': {
    tables: [''],
    data: [''],
    indexes: ['']
  }
};

module.exports = tables;
