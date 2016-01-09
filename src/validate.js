'use strict';
const validators = require(__dirname + '/validators.js');
const extensions = require(__dirname + '/extensions.js');

module.exports = (obj, documentSchema) => {
  let errors = [];

  let test = extensions;

  for(let field in documentSchema) {
    if(documentSchema.hasOwnProperty(field)) {
      let fieldSchema = documentSchema[field];
      let validator = undefined;
      if(fieldSchema.namespace === undefined) {
        validator = validators[fieldSchema.type]; // TODO if there is no validator of that type, we need to push an error
      }
      else {
        validator = extensions[fieldSchema.namespace]
          .validators[fieldSchema.type]; // TODO if there is no extension of that namespace or validator of that type, we need to push an error
      }
      let result = validator(obj[field], fieldSchema);
      if(!result.valid) {
        errors.push({field:field, errors:result.errors});
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors: errors
  }
}