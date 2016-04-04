'use strict'

const validators = require(__dirname + '/validators.js')
const merge = require('setthings').merge
const Schema = require(__dirname + '/Schema')

// TODO make validate part of Schema ... then do schema.validate(obj, options) in here ... or move the 'static' method to Schema for good and drop this file
function validate (obj, documentSchema, options) {
  documentSchema.validate(obj, options)
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

// TODO is this still used?
/*
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
*/

module.exports.validate = validate
//module.exports.create = create
//module.exports.fn = validate