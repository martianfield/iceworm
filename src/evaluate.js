'use strict';

const createDocumentSchema = require(__dirname + '/createDocumentSchema.js');
const validate = require(__dirname + '/validate.js');
const patch = require(__dirname + '/patch.js');

module.exports = (obj, rawDocumentSchema) => {
  let documentSchema = createDocumentSchema(rawDocumentSchema);
  let validationResult = validate(obj, documentSchema);
  let patchingResult = patch(obj, documentSchema);

  return {
    valid: validationResult.valid,
    obj: patchingResult,
    errors: validationResult.errors
  }
}