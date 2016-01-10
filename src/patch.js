'use strict';

const patchers = require(__dirname + '/patchers.js');
const extensions = require(__dirname + '/extensions.js');

module.exports = (obj, documentSchema) => {
  let output = {};

  for(let field in documentSchema.fields) {
    if(documentSchema.fields.hasOwnProperty(field)) {
      if(!obj.hasOwnProperty(field)) {
        output[field] = undefined;
      }
      else {
        let fieldSchema = documentSchema.fields[field];
        if(fieldSchema.namespace === undefined) {
          output[field] = patchers[fieldSchema.type](obj[field]);
        }
        else {
          output[field] = extensions[fieldSchema.namespace]
            .patchers[fieldSchema.type](obj[field]);
        }
      }
    }
  }
  return output;
}