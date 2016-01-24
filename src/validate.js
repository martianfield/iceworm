'use strict';
const validators = require(__dirname + '/validators.js');
//const extensions = require(__dirname + '/extensions.js');

module.exports = (obj, documentSchema) => {
  let errors = [];
  let objs = obj.constructor === Array ? obj : [obj]

  for(let field in documentSchema.fields) {
    if(documentSchema.fields.hasOwnProperty(field)) {
      let fieldInfo = documentSchema.fields[field];
      let validator = fieldInfo.array ? validators.array : fieldInfo.validator()

      objs.forEach((item) => {
        let result = validator(item[field], fieldInfo)

        if(!result.valid) {
          errors.push({field:field, errors:result.errors});
        }
      })

    }
  }

  return {
    valid: errors.length === 0,
    errors: errors
  }
}