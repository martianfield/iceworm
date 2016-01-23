'use strict'

const Schema = require(__dirname + '/schema.js');
const validate = require(__dirname + '/validate.js');
const patch = require(__dirname + '/patch.js');


module.exports = (obj, schema) => {
  let documentSchema
  // TODO silly work-around because I can't figure out why instanceof is not working here
  if(schema.__classid__ === Schema.__classid__) {
    documentSchema = schema
  }
  else {
    documentSchema = Schema.create(schema)
  }
  //let documentSchema = Schema.create(rawDocumentSchema);
  let validationResult = validate(obj, documentSchema);
  let patchingResult = patch(obj, documentSchema);

  return {
    valid: validationResult.valid,
    obj: patchingResult,
    errors: validationResult.errors
  }
}