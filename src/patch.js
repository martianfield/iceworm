'use strict';

const patchers = require(__dirname + '/patchers.js');
const extensions = require(__dirname + '/extensions.js');

module.exports = (obj, documentSchema) => {
  let output = {};

  for(let field in documentSchema.fields) {
    let fieldSchema = documentSchema.fields[field];
    if(documentSchema.fields.hasOwnProperty(field)) {
      if(!fieldSchema.hidden) {
        if(!obj.hasOwnProperty(field)) {
          output[field] = undefined;
        }
        else {
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
  }
  return output;
}