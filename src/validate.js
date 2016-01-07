'use strict';
const validators = require(__dirname + '/validators.js');

// TODO this method takes the schema first, the obj second ... the type validators do it the other way round ... need to consolidate this
module.exports = (documentSchema, obj) => {
  let errors = [];

  for(let field in documentSchema) {
    if(documentSchema.hasOwnProperty(field)) {
      let fieldSchema = documentSchema[field];
      let validator = validators[fieldSchema.type]; // TODO if there is no validator of that type, we need to push an error
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