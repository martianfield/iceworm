'use strict';

const projectors = require(__dirname + '/projectors.js');
const extensions = require(__dirname + '/extensions.js');

module.exports = (obj, documentSchema) => {
  let output = {};
  //let objs = obj.constructor === Array ? obj : [obj]

  documentSchema.fields.forEach((fieldInfo) => {
    if(!fieldInfo.hidden) {

      if(!fieldInfo.array) {
        if(!obj.hasOwnProperty(fieldInfo.name)) {
          output[fieldInfo.name] = undefined;
        }
        else {
          let project = fieldInfo.projector()
          output[fieldInfo.name] = project(obj[fieldInfo.name])
        }
      }
      else {
        let project = projectors.array
        output[fieldInfo.name] = project(obj[fieldInfo.name], fieldInfo)
      }
    }
  })
  /*
  for(let field in documentSchema.fields) {
    let fieldInfo = documentSchema.fields[field];
    if(documentSchema.fields.hasOwnProperty(field)) {
      if(!fieldInfo.hidden) {

        if(!fieldInfo.array) {
          if(!obj.hasOwnProperty(field)) {
            output[field] = undefined;
          }
          else {
            let project = fieldInfo.projector()
            output[field] = project(obj[field])
          }
        }
        else {
          let project = projectors.array
          output[field] = project(obj[field], fieldInfo)
        }
      }
    }
  }
  */
  return output;
}