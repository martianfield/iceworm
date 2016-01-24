'use strict';
const validators = require(__dirname + '/validators.js')

module.exports = (obj, documentSchema) => {
  let errors = []

  for(let field in documentSchema.fields) {
    if(documentSchema.fields.hasOwnProperty(field)) {
      let fieldInfo = documentSchema.fields[field];
      let validator = fieldInfo.array ? validators.array : fieldInfo.validator()

      let result = validator(obj[field], fieldInfo)

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
