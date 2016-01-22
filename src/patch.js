'use strict';

const patchers = require(__dirname + '/patchers.js');
const extensions = require(__dirname + '/extensions.js');

module.exports = (obj, documentSchema) => {
  let output = {};

  for(let field in documentSchema.fields) {
    let fieldInfo = documentSchema.fields[field];
    if(documentSchema.fields.hasOwnProperty(field)) {
      if(!fieldInfo.hidden) {

        if(!fieldInfo.array) {
          if(!obj.hasOwnProperty(field)) {
            output[field] = undefined;
          }
          else {
            let patch = fieldInfo.patcher()
            output[field] = patch(obj[field])
          }
        }
        else {
          let patch = patchers.array
          output[field] = patch(obj[field], fieldInfo)
        }
      }
    }
  }
  return output;
}