'use strict';
const validators = require(__dirname + '/validators.js')
const merge = require('setthings').merge

module.exports = (obj, documentSchema, options) => {
  options = merge(options, {ignoreRequired:false})

  let errors = []

  documentSchema.fields.forEach((fi) => {
    //let validator = fi.array ? validators.array : fi.validator()

    let validator = fi.array ? validators.get('array') : fi.validator()

    let result = validator(obj[fi.name], fi)

    if(!result.valid) {
      result.errors.forEach(error => {
        if(error.reason === 'required' && options.ignoreRequired) {
          return
        }
        errors.push({
          field:fi.name,
          message:error.message,
          reason:error.reason
        })
      })
    }
  })

  return {
    valid: errors.length === 0,
    errors: errors
  }
}
