'use strict';

const patchers = require(__dirname + '/patchers.js');

module.exports = (obj, documentSchema) => {
  let output = {};

  for(let field in documentSchema) {
    if(documentSchema.hasOwnProperty(field)) {
      if(!obj.hasOwnProperty(field)) {
        output[field] = undefined;
      }
      else {
        let fieldSchema = documentSchema[field];
        output[field] = patchers[fieldSchema.type](obj[field]);
      }
    }
  }
  return output;
}