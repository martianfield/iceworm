'use strict';

const createFieldSchema = require(__dirname + '/createFieldSchema.js');

module.exports = (raw) => {
  let schema = {};
  for(let prop in raw) {
    if(raw.hasOwnProperty(prop)) {
      schema[prop] = createFieldSchema(raw[prop]);
    }
  }
  return schema;
};
