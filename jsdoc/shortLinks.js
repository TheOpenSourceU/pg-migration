//Source: https://raw.githubusercontent.com/vitaly-t/pg-promise/master/jsdoc/shortLinks.js
var fixLinks = require('./fixLinks');

exports.handlers = {
  beforeParse: e => {
    e.source = fixLinks(e.source);
  }
};
