'use strict'

const validators = require(__dirname + '/validators.js')
const merge = require('setthings').merge

function validate (obj, documentSchema, options) {
  // TODO make sure options is in the documentation ... also, document it here
  options = merge(options, {ignoreRequired:false})

  let errors = []

  documentSchema.fields.forEach((fi) => {
    
    let result = fi.validate(obj[fi.name], fi)

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

function create(documentSchema, options) {
  return function(obj) {
    // TODO make sure options is in the documentation ... also, document it here
    options = merge(options, {ignoreRequired:false})

    let errors = []

    documentSchema.fields.forEach((fi) => {

      let result = fi.validate(obj[fi.name], fi)

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
}


module.exports.validate = validate
module.exports.create = create
//module.exports.fn = validate