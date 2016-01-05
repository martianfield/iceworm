'use strict';

const createFieldSchema = require(__dirname + '/createFieldSchema.js');

module.exports = (raw) => {
  let schema = [];
  for(let prop in raw) {
    if(raw.hasOwnProperty(prop)) {
      schema.push({field:prop, schema:createFieldSchema(raw[prop])});
    }
  }
  return schema;
};
