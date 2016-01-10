'use strict';

//const createFieldSchema = require(__dirname + '/createFieldSchema.js');
const FieldInfo = require(__dirname + '/FieldInfo.js');

module.exports = (raw) => {
  let schema = {};
  for(let prop in raw) {
    if(raw.hasOwnProperty(prop)) {
      //schema[prop] = createFieldSchema(raw[prop]);
      schema[prop] = FieldInfo.create(prop, raw[prop]);
    }
  }
  return schema;
};
