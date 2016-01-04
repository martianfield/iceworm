'use strict';

const parseDefinition = require(__dirname + '/parse-definition.js');

module.exports = (raw) => {
  let schema = [];
  for(let prop in raw) {
    if(raw.hasOwnProperty(prop)) {
      schema.push({field:prop, schema:parseDefinition(raw[prop])});
    }
  }
  return schema;
};
